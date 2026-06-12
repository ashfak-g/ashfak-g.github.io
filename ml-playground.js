// ----------------------------------------------------
// Ashfak.dev Portfolio Interactive ML Playground
// Fits Linear and Polynomial Regressions in browser
// ----------------------------------------------------

document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('mlCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const modelTypeSelect = document.getElementById('modelType');
    const pointCountEl = document.getElementById('pointCount');
    const r2ScoreEl = document.getElementById('r2Score');
    const mseValEl = document.getElementById('mseVal');
    const equationContentEl = document.getElementById('equationContent');
    const clearBtn = document.getElementById('clearBtn');
    const randomBtn = document.getElementById('randomBtn');

    // List of points {x: float, y: float} in normalized range [0, 10]
    let points = [];

    // Colors & Settings
    const colors = {
        grid: 'rgba(255, 255, 255, 0.05)',
        axes: 'rgba(255, 255, 255, 0.2)',
        point: '#10b981', // Emerald Green
        pointGlow: 'rgba(16, 185, 129, 0.4)',
        line: '#34d399',  // Mint Green
        lineGlow: 'rgba(52, 211, 153, 0.25)',
        text: '#9ca3af'
    };

    // Initialize Canvas Dimensions on load and resize
    function resizeCanvas() {
        // We use clientWidth/clientHeight to keep coordinate systems matched
        const rect = canvas.parentNode.getBoundingClientRect();
        canvas.width = rect.width;
        // Keep a nice landscape aspect ratio
        canvas.height = rect.width / 1.5;
        draw();
    }
    
    window.addEventListener('resize', resizeCanvas);
    // Call once to establish dimensions
    setTimeout(resizeCanvas, 100);

    // Coordinate conversions: Canvas pixel space <--> Normalized [0, 10] cartesian space
    // Canvas: (0,0) is top-left, (W,H) is bottom-right
    // Normalized: (0,0) is bottom-left, (10,10) is top-right (standard math graph)
    const padding = 40;

    function toCartesian(px, py) {
        const x = ((px - padding) / (canvas.width - padding * 2)) * 10;
        const y = 10 - (((py - padding) / (canvas.height - padding * 2)) * 10);
        return { x: Math.max(0, Math.min(10, x)), y: Math.max(0, Math.min(10, y)) };
    }

    function toPixel(cx, cy) {
        const px = padding + (cx / 10) * (canvas.width - padding * 2);
        const py = padding + ((10 - cy) / 10) * (canvas.height - padding * 2);
        return { x: px, y: py };
    }

    // Event Listener: Add point on click
    canvas.addEventListener('click', (e) => {
        const rect = canvas.getBoundingClientRect();
        // Get scale coordinates in case canvas CSS size differs
        const px = ((e.clientX - rect.left) / rect.width) * canvas.width;
        const py = ((e.clientY - rect.top) / rect.height) * canvas.height;
        
        const pt = toCartesian(px, py);
        points.push(pt);
        updateModel();
    });

    // Solve Ax = B using Gauss-Jordan Elimination
    function solveMatrix(A, B) {
        const n = B.length;
        for (let i = 0; i < n; i++) {
            // Pivoting
            let maxRow = i;
            for (let j = i + 1; j < n; j++) {
                if (Math.abs(A[j][i]) > Math.abs(A[maxRow][i])) {
                    maxRow = j;
                }
            }
            const tempRow = A[i];
            A[i] = A[maxRow];
            A[maxRow] = tempRow;
            
            const tempVal = B[i];
            B[i] = B[maxRow];
            B[maxRow] = tempVal;
            
            const pivot = A[i][i];
            if (Math.abs(pivot) < 1e-10) return null; // Singular matrix
            
            for (let j = i; j < n; j++) A[i][j] /= pivot;
            B[i] /= pivot;
            
            for (let j = 0; j < n; j++) {
                if (j !== i) {
                    const factor = A[j][i];
                    for (let k = i; k < n; k++) A[j][k] -= factor * A[i][k];
                    B[j] -= factor * B[i];
                }
            }
        }
        return B;
    }

    // Fit polynomial of given degree: y = a0 + a1*x + a2*x^2 + ... + ad*x^d
    function fitPolynomial(pts, degree) {
        const n = pts.length;
        const mSize = degree + 1;
        
        // Initialize Matrix A and Vector B
        const A = Array.from({ length: mSize }, () => Array(mSize).fill(0));
        const B = Array(mSize).fill(0);

        // Sum powers of X and products Y*X^p
        for (let row = 0; row < mSize; row++) {
            for (let col = 0; col < mSize; col++) {
                let sumX = 0;
                for (let k = 0; k < n; k++) {
                    sumX += Math.pow(pts[k].x, row + col);
                }
                A[row][col] = sumX;
            }
            
            let sumYX = 0;
            for (let k = 0; k < n; k++) {
                sumYX += pts[k].y * Math.pow(pts[k].x, row);
            }
            B[row] = sumYX;
        }

        return solveMatrix(A, B); // Returns array of coefficients [a0, a1, a2, ...]
    }

    // Compute Y value given X and coefficients
    function evaluateModel(cx, coeffs) {
        if (!coeffs) return 0;
        let cy = 0;
        for (let i = 0; i < coeffs.length; i++) {
            cy += coeffs[i] * Math.pow(cx, i);
        }
        return cy;
    }

    // Main Draw Function
    let activeCoeffs = null;

    function draw() {
        // Clear screen
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const width = canvas.width;
        const height = canvas.height;

        // 1. Draw Grid Lines
        ctx.strokeStyle = colors.grid;
        ctx.lineWidth = 1;
        
        for (let i = 1; i <= 9; i++) {
            // Vertical grids
            const p1 = toPixel(i, 0);
            const p2 = toPixel(i, 10);
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();

            // Horizontal grids
            const p3 = toPixel(0, i);
            const p4 = toPixel(10, i);
            ctx.beginPath();
            ctx.moveTo(p3.x, p3.y);
            ctx.lineTo(p4.x, p4.y);
            ctx.stroke();
        }

        // 2. Draw Axes
        ctx.strokeStyle = colors.axes;
        ctx.lineWidth = 2;
        ctx.beginPath();
        // Y-axis (left border boundary)
        const origin = toPixel(0, 0);
        const yTop = toPixel(0, 10);
        ctx.moveTo(origin.x, origin.y);
        ctx.lineTo(yTop.x, yTop.y);
        // X-axis (bottom border boundary)
        const xRight = toPixel(10, 0);
        ctx.moveTo(origin.x, origin.y);
        ctx.lineTo(xRight.x, xRight.y);
        ctx.stroke();

        // Axis labels
        ctx.fillStyle = colors.text;
        ctx.font = '10px Fira Code';
        ctx.textAlign = 'center';
        
        // X-Axis Labels
        for (let i = 0; i <= 10; i += 2) {
            const pos = toPixel(i, 0);
            ctx.fillText(i, pos.x, pos.y + 18);
        }
        
        // Y-Axis Labels
        ctx.textAlign = 'right';
        for (let i = 0; i <= 10; i += 2) {
            const pos = toPixel(0, i);
            ctx.fillText(i, pos.x - 8, pos.y + 4);
        }

        // 3. Draw Regression Line / Curve
        if (activeCoeffs && points.length >= getRequiredPoints()) {
            ctx.strokeStyle = colors.line;
            ctx.lineWidth = 3;
            
            // Neon Glow effect
            ctx.shadowColor = colors.lineGlow;
            ctx.shadowBlur = 10;

            ctx.beginPath();
            const firstPixel = toPixel(0, evaluateModel(0, activeCoeffs));
            ctx.moveTo(firstPixel.x, firstPixel.y);

            // Step through pixel width to draw curve smoothly
            const steps = 150;
            for (let i = 1; i <= steps; i++) {
                const cx = (i / steps) * 10;
                const cy = evaluateModel(cx, activeCoeffs);
                const pixel = toPixel(cx, cy);
                
                // Keep drawing bounded inside the canvas viewport
                ctx.lineTo(pixel.x, pixel.y);
            }
            ctx.stroke();

            // Reset shadows for points
            ctx.shadowBlur = 0;
        }

        // 4. Draw Scattered Points
        points.forEach(pt => {
            const pixel = toPixel(pt.x, pt.y);
            
            // Glowing outer circle
            ctx.fillStyle = colors.pointGlow;
            ctx.beginPath();
            ctx.arc(pixel.x, pixel.y, 8, 0, Math.PI * 2);
            ctx.fill();

            // Bright core circle
            ctx.fillStyle = colors.point;
            ctx.beginPath();
            ctx.arc(pixel.x, pixel.y, 4, 0, Math.PI * 2);
            ctx.fill();
        });
    }

    // Determine degree of selected model
    function getModelDegree() {
        const type = modelTypeSelect.value;
        if (type === 'polynomial') return 2;
        if (type === 'cubic') return 3;
        return 1; // linear
    }

    function getRequiredPoints() {
        return getModelDegree() + 1;
    }

    // Train and Update Metrics
    function updateModel() {
        const degree = getModelDegree();
        const required = getRequiredPoints();
        
        pointCountEl.textContent = points.length;

        if (points.length >= required) {
            const coeffs = fitPolynomial(points, degree);
            activeCoeffs = coeffs;

            if (coeffs) {
                // Calculate MSE and R2
                let sumSqError = 0;
                let sumSqTotal = 0;
                
                // Compute mean Y
                let sumY = 0;
                points.forEach(p => sumY += p.y);
                const meanY = sumY / points.length;

                points.forEach(p => {
                    const predY = evaluateModel(p.x, coeffs);
                    sumSqError += Math.pow(p.y - predY, 2);
                    sumSqTotal += Math.pow(p.y - meanY, 2);
                });

                const mse = sumSqError / points.length;
                const r2 = sumSqTotal === 0 ? 1 : 1 - (sumSqError / sumSqTotal);

                // Update UI elements
                r2ScoreEl.textContent = r2.toFixed(4);
                mseValEl.textContent = mse.toFixed(4);

                // Render Equation string
                let eq = 'y = ';
                for (let i = coeffs.length - 1; i >= 0; i--) {
                    const val = coeffs[i];
                    if (Math.abs(val) < 0.0001) continue;

                    const sign = val >= 0 ? (i === coeffs.length - 1 ? '' : ' + ') : ' - ';
                    const absVal = Math.abs(val).toFixed(2);
                    
                    if (i === 0) {
                        eq += sign + absVal;
                    } else if (i === 1) {
                        eq += sign + absVal + 'x';
                    } else {
                        eq += sign + absVal + 'x^' + i;
                    }
                }
                equationContentEl.textContent = eq;
            } else {
                r2ScoreEl.textContent = 'Err';
                mseValEl.textContent = 'Err';
                equationContentEl.textContent = 'Singular matrix (points lie on vertical line)';
            }
        } else {
            activeCoeffs = null;
            r2ScoreEl.textContent = 'N/A';
            mseValEl.textContent = 'N/A';
            equationContentEl.textContent = `Add at least ${required} points to compute model`;
        }

        draw();
    }

    // Clear Screen Action
    clearBtn.addEventListener('click', () => {
        points = [];
        updateModel();
    });

    // Generate Random Noisy Points (along target lines)
    randomBtn.addEventListener('click', () => {
        points = [];
        const degree = getModelDegree();
        
        let count = 12 + Math.floor(Math.random() * 8); // 12-20 points
        
        // Underlying function shapes
        let targetFunc;
        if (degree === 1) {
            // Line: y = 0.6x + 2
            targetFunc = (x) => 0.6 * x + 2;
        } else if (degree === 2) {
            // Parabola: y = -0.15(x-5)^2 + 8
            targetFunc = (x) => -0.12 * Math.pow(x - 5, 2) + 7;
        } else {
            // Cubic: S-curve
            targetFunc = (x) => 0.03 * Math.pow(x - 5, 3) - 0.2 * (x - 5) + 5;
        }

        for (let i = 0; i < count; i++) {
            // Uniformly space x across [1, 9] with random offsets
            const x = 1 + (i / (count - 1)) * 8 + (Math.random() - 0.5) * 0.3;
            // Add gaussian-like noise
            const noise = (Math.random() - 0.5) * 1.5;
            const y = Math.max(0.2, Math.min(9.8, targetFunc(x) + noise));
            
            points.push({ x, y });
        }

        updateModel();
    });

    // Handle Model Type selection change
    modelTypeSelect.addEventListener('change', updateModel);
});
