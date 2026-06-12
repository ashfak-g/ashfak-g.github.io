// ==========================================
// DATASET PROFILER ENGINE (data-profiler.js)
// ==========================================
// Natively analyzes uploaded CSV/JSON datasets inside the client's browser.

document.addEventListener('DOMContentLoaded', () => {
    // Safe LocalStorage Wrapper
    function getSafeStorage(key, fallback) {
        try {
            return localStorage.getItem(key) || fallback;
        } catch (e) {
            return fallback;
        }
    }

    const uploadZone = document.getElementById('uploadZone');
    const csvFileInput = document.getElementById('csvFileInput');
    const loadDemoBtn = document.getElementById('loadDemoBtn');
    const reportCard = document.getElementById('reportCard');
    const rowQuantity = document.getElementById('rowQuantity');
    const colQuantity = document.getElementById('colQuantity');
    const missingQuantity = document.getElementById('missingQuantity');
    const qualityBanner = document.getElementById('qualityBanner');
    const dataStoryBanner = document.getElementById('dataStoryBanner');
    const summaryTableBody = document.getElementById('summaryTableBody');

    if (!uploadZone || !csvFileInput || !reportCard) return;

    // 1. Drag & Drop File Handlers
    uploadZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadZone.classList.add('dragover');
    });

    uploadZone.addEventListener('dragleave', () => {
        uploadZone.classList.remove('dragover');
    });

    uploadZone.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadZone.classList.remove('dragover');
        
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            processFile(files[0]);
        }
    });

    // 2. Click upload area to select files
    uploadZone.addEventListener('click', (e) => {
        if (e.target.tagName !== 'LABEL' && e.target.tagName !== 'INPUT' && !e.target.closest('label')) {
            csvFileInput.click();
        }
    });

    csvFileInput.addEventListener('change', (e) => {
        const files = e.target.files;
        if (files.length > 0) {
            processFile(files[0]);
        }
    });

    // 3. Load Sample Demo Dataset
    if (loadDemoBtn) {
        loadDemoBtn.addEventListener('click', () => {
            const demoCSV = `OrderID,Product,Category,Price,Quantity,CustomerName,Region,OrderDate,Discount
1001,SuperShop Clean Detergent,Household,12.50,2,John Doe,Dhaka,2026-05-10,0.05
1002,SmartPhone Wireless Charger,Electronics,29.99,1,Jane Smith,Chittagong,2026-05-11,0.00
1003,Premium organic Green Tea,Beverages,8.45,,Abdur Rahman,Sylhet,2026-05-12,0.10
1004,Ergonomic Office Chair,Furniture,149.00,1,Ashfakur Rahman,Dhaka,2026-05-12,0.15
1005,Bluetooth Bass Headphones,Electronics,45.00,2,Siddique Ali,Khulna,,0.00
1006,Organic Honey Jar,Beverages,,3,Farhana Yeasmin,Dhaka,2026-05-14,0.05
1007,Premium organic Green Tea,Beverages,8.45,4,Abdur Rahman,Sylhet,2026-05-12,0.10
1008,Kitchen Non-stick Pan,Household,35.00,1,Mahbubur Chowdhury,Barisal,2026-05-15,0.00`;
            analyzeData(demoCSV, 'demo_sales_data.csv');
        });
    }

    // 4. Read file contents
    function processFile(file) {
        const MAX_SIZE = 25 * 1024 * 1024; // 25 MB
        if (file.size > MAX_SIZE) {
            alert('File size exceeds the 25 MB limit.');
            return;
        }

        const isCSV = file.name.endsWith('.csv');
        const isJSON = file.name.endsWith('.json');
        const isExcel = file.name.endsWith('.xlsx') || file.name.endsWith('.xls');

        if (!isCSV && !isJSON && !isExcel) {
            alert('Please upload a valid CSV, JSON, or Excel file.');
            return;
        }

        if (isExcel) {
            if (typeof XLSX === 'undefined') {
                alert('Excel parsing library is not loaded.');
                return;
            }
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const data = new Uint8Array(e.target.result);
                    const workbook = XLSX.read(data, {type: 'array'});
                    const firstSheetName = workbook.SheetNames[0];
                    const worksheet = workbook.Sheets[firstSheetName];
                    const rows = XLSX.utils.sheet_to_json(worksheet, {defval: ''});
                    
                    if (rows.length === 0) {
                        alert('The Excel file is empty.');
                        return;
                    }
                    const headers = Object.keys(rows[0]);
                    performProfiling(rows, headers, file.name);
                } catch (err) {
                    console.error(err);
                    alert('Error parsing Excel file.');
                }
            };
            reader.readAsArrayBuffer(file);
        } else {
            const reader = new FileReader();
            reader.onload = (e) => {
                const content = e.target.result;
                analyzeData(content, file.name);
            };
            reader.readAsText(file);
        }
    }

    // 5. Raw Text Parsing Engine
    function analyzeData(text, fileName) {
        let rows = [];
        let headers = [];

        if (fileName.endsWith('.json')) {
            try {
                const jsonObj = JSON.parse(text);
                if (Array.isArray(jsonObj)) {
                    rows = jsonObj;
                    if (rows.length > 0) {
                        headers = Object.keys(rows[0]);
                    }
                } else if (typeof jsonObj === 'object') {
                    const keys = Object.keys(jsonObj);
                    const arrayKey = keys.find(k => Array.isArray(jsonObj[k]));
                    if (arrayKey) {
                        rows = jsonObj[arrayKey];
                        headers = Object.keys(rows[0]);
                    } else {
                        rows = [jsonObj];
                        headers = Object.keys(jsonObj);
                    }
                }
            } catch (err) {
                alert('Invalid JSON file structure.');
                return;
            }
        } else {
            // Parse CSV lines safely
            const lines = text.split(/\r?\n/);
            if (lines.length === 0 || lines[0].trim() === '') {
                alert('The CSV file is empty.');
                return;
            }

            headers = parseCSVLine(lines[0]);
            
            for (let i = 1; i < lines.length; i++) {
                const line = lines[i].trim();
                if (line === '') continue;
                const values = parseCSVLine(line);
                
                const rowObj = {};
                headers.forEach((h, idx) => {
                    rowObj[h] = values[idx] !== undefined ? values[idx] : '';
                });
                rows.push(rowObj);
            }
        }

        if (rows.length === 0) {
            alert('No records found in this dataset.');
            return;
        }

        performProfiling(rows, headers, fileName);
    }

    // Helper to parse CSV fields containing commas enclosed in quotes
    function parseCSVLine(line) {
        const result = [];
        let current = '';
        let inQuotes = false;
        
        for (let i = 0; i < line.length; i++) {
            const char = line[i];
            if (char === '"') {
                inQuotes = !inQuotes;
            } else if (char === ',' && !inQuotes) {
                result.push(current.trim());
                current = '';
            } else {
                current += char;
            }
        }
        result.push(current.trim());
        return result;
    }

    // Heuristically generate a descriptive paragraph summary based on column names
    function generateDataStory(rows, headers) {
        const numRows = rows.length;
        const numCols = headers.length;
        const colNames = headers.map(h => `"${h}"`);
        
        let fileContext = "";
        const colsJoined = headers.map(h => h.toLowerCase());
        
        if (colsJoined.some(c => c.includes('price') || c.includes('sale') || c.includes('revenue') || c.includes('sold') || c.includes('transaction') || c.includes('order') || c.includes('discount'))) {
            fileContext = `This dataset contains transactions and sales performance records. It traces key retail details like pricing, product quantities, sales margins, and orders across multiple transactions. It outlines the purchase behaviors of customers and region-based market demands, making it highly valuable for business intelligence, sales forecasting, and KPI modeling.`;
        } else if (colsJoined.some(c => c.includes('heart') || c.includes('health') || c.includes('patient') || c.includes('medical') || c.includes('disease') || c.includes('clinical') || c.includes('ecg') || c.includes('blood'))) {
            fileContext = `This dataset outlines medical observations and patient health metrics. It contains diagnostic parameters, clinical indicators, and patient profiles. It is suitable for clinical anomaly detection, predictive health modeling, and exploring risk factors related to health conditions.`;
        } else if (colsJoined.some(c => c.includes('temp') || c.includes('weather') || c.includes('rain') || c.includes('wind') || c.includes('humidity') || c.includes('climate') || c.includes('env'))) {
            fileContext = `This dataset captures meteorological or environmental weather observations. It records ambient climate variables like temperature, wind parameters, and atmospheric conditions over time. It represents a typical time-series sequence useful for climate forecasting, trend analysis, and environmental modeling.`;
        } else if (colsJoined.some(c => c.includes('employee') || c.includes('salary') || c.includes('hr') || c.includes('staff') || c.includes('department') || c.includes('job'))) {
            fileContext = `This dataset captures human resources (HR) metrics and employee profiles. It details department allocations, payroll figures, employment durations, and roles within the organization, serving as a clean resource for corporate structuring and labor cost analytics.`;
        } else {
            fileContext = `This dataset contains structured records representing a tabular database. The primary features include ${colNames.slice(0, 3).join(', ')}. It serves as a multidimensional matrix suitable for exploratory data analysis (EDA), pattern discovery, and predictive machine learning models.`;
        }

        const currentLang = getSafeStorage('portfolio_lang', 'en');
        if (currentLang === 'bn') {
            let fileContextBn = "";
            if (fileContext.includes('sales')) {
                fileContextBn = `এই ডাটাসেটটিতে বিক্রয় পারফরম্যান্স এবং ট্রানজেকশনের তথ্য রয়েছে। এতে প্রতিটি অর্ডারের দাম, পরিমাণ, প্রডাক্ট এবং রিজিওনভিত্তিক ক্রয়ের তথ্য রয়েছে, যা সেলস ফোরকাস্টিং ও কেপিআই রিপোর্টিংয়ের জন্য অত্যন্ত উপযোগী।`;
            } else if (fileContext.includes('medical')) {
                fileContextBn = `এই ডাটাসেটটিতে ক্লিনিক্যাল ডায়াগনস্টিক প্যারামিটার এবং রোগীর স্বাস্থ্যের বিভিন্ন তথ্য রয়েছে। এটি অ্যানোমালি সনাক্তকরণ ও স্বাস্থ্য ঝুঁকি মডেলিং করার জন্য উপযোগী।`;
            } else if (fileContext.includes('weather')) {
                fileContextBn = `এই ডাটাসেটটিতে বিভিন্ন সময়ের আবহাওয়া সংক্রান্ত তথ্য রয়েছে (যেমন তাপমাত্রা, আর্দ্রতা ও জলবায়ুর মান)। এটি ফোরকাস্টিং এবং এনভায়রনমেন্টাল অ্যানালিসিসের জন্য ব্যবহৃত হতে পারে।`;
            } else if (fileContext.includes('HR')) {
                fileContextBn = `এই ডাটাসেটটিতে মানব সম্পদ (HR) সম্পর্কিত ডেটা রয়েছে (যেমন বেতন, বিভাগ ও কর্মচারীদের প্রোফাইল)। এটি প্রাতিষ্ঠানিক কাজের ফ্লো ও পে-রোল বিশ্লেষণের জন্য উপযোগী।`;
            } else {
                fileContextBn = `এই ডাটাসেটটিতে টেবুলার ফরম্যাটে তথ্য সাজানো রয়েছে। এর কলামগুলোর মধ্যে অন্যতম হলো ${headers.slice(0, 3).join(', ')}। এটি ডেটা এক্সপ্লোরেশন (EDA) ও বিভিন্ন প্যাটার্ন সনাক্তকরণ মডেলিংয়ের জন্য পারফেক্ট।`;
            }
            return `
                <div class="data-story-banner clean" style="background: rgba(16, 185, 129, 0.02); border: 1px solid rgba(16, 185, 129, 0.15); padding: 1.2rem; border-radius: 10px; margin-bottom: 1.2rem;">
                    <h4 style="color: #10b981; margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.5rem;"><i class="fa-solid fa-file-invoice"></i> ডেটার পরিচিতি ও সারসংক্ষেপ:</h4>
                    <p style="font-size: 0.9rem; line-height: 1.6; color: #fff; margin: 0;">আপলোড করা ডেটাসেটে মোট <strong>${numRows.toLocaleString()} টি সারি (Rows)</strong> এবং <strong>${numCols.toLocaleString()} টি কলাম (Columns)</strong> পাওয়া গেছে। ${fileContextBn}</p>
                </div>
            `;
        } else {
            return `
                <div class="data-story-banner clean" style="background: rgba(16, 185, 129, 0.02); border: 1px solid rgba(16, 185, 129, 0.15); padding: 1.2rem; border-radius: 10px; margin-bottom: 1.2rem;">
                    <h4 style="color: #10b981; margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.5rem;"><i class="fa-solid fa-file-invoice"></i> Dataset Interpretation & Context:</h4>
                    <p style="font-size: 0.9rem; line-height: 1.6; color: #fff; margin: 0;">The uploaded dataset consists of <strong>${numRows.toLocaleString()} rows</strong> and <strong>${numCols.toLocaleString()} columns</strong>. ${fileContext}</p>
                </div>
            `;
        }
    }

    // 6. Statistics Profiling and Report Builder
    function performProfiling(rows, headers, fileName) {
        const numRows = rows.length;
        const numCols = headers.length;

        let totalMissing = 0;
        const colMissingCount = {};
        const colTypes = {};
        const colUniqueCount = {};
        
        headers.forEach(h => {
            colMissingCount[h] = 0;
            colUniqueCount[h] = new Set();
        });

        // Compute missing counts and unique sets
        rows.forEach(row => {
            headers.forEach(h => {
                const val = row[h];
                if (val === undefined || val === null || val === '' || val.toString().toLowerCase() === 'null') {
                    colMissingCount[h]++;
                    totalMissing++;
                } else {
                    colUniqueCount[h].add(val.toString().trim());
                }
            });
        });

        // Infer numeric vs text types
        headers.forEach(h => {
            let numericCount = 0;
            let totalVal = 0;
            
            rows.forEach(row => {
                const val = row[h];
                if (val !== undefined && val !== null && val !== '') {
                    totalVal++;
                    if (!isNaN(val) && val.toString().trim() !== '') {
                        numericCount++;
                    }
                }
            });

            if (numericCount / totalVal > 0.8 && totalVal > 0) {
                colTypes[h] = 'Numerical';
            } else {
                colTypes[h] = 'Categorical';
            }
        });

        // Compute duplicates
        let duplicateCount = 0;
        const seenRows = new Set();
        rows.forEach(row => {
            const rowStr = JSON.stringify(row);
            if (seenRows.has(rowStr)) {
                duplicateCount++;
            } else {
                seenRows.add(rowStr);
            }
        });

        // Render Summary Counters
        rowQuantity.textContent = numRows.toLocaleString();
        colQuantity.textContent = numCols.toLocaleString();
        missingQuantity.textContent = totalMissing.toLocaleString();

        // Render Column Rows in Table
        summaryTableBody.innerHTML = headers.map(h => {
            const sample = rows[0][h] !== undefined ? rows[0][h] : 'N/A';
            return `
                <tr>
                    <td><strong>${h}</strong></td>
                    <td>${colTypes[h]}</td>
                    <td>${colMissingCount[h]} (${((colMissingCount[h] / numRows) * 100).toFixed(0)}%)</td>
                    <td>${colUniqueCount[h].size.toLocaleString()}</td>
                    <td><code>${sample.toString().substring(0, 30)}${sample.toString().length > 30 ? '...' : ''}</code></td>
                </tr>
            `;
        }).join('');

        // Generate and Insert Data Story Paragraph Summary
        dataStoryBanner.innerHTML = generateDataStory(rows, headers);

        // Quality Banner logic
        const hasIssues = totalMissing > 0 || duplicateCount > 0;
        const currentLang = getSafeStorage('portfolio_lang', 'en');
        
        if (!hasIssues) {
            qualityBanner.className = 'quality-banner clean';
            if (currentLang === 'bn') {
                qualityBanner.innerHTML = `
                    <h4><i class="fa-solid fa-circle-check"></i> ডেটার মান: চমৎকার ও পরিচ্ছন্ন!</h4>
                    <p>দারুণ! আপলোড করা ডেটাসেটে কোনো মিসিং সেল (Missing Values) বা ডুপ্লিকেট সারি পাওয়া যায়নি। ডেটা সম্পূর্ণ পরিচ্ছন্ন এবং বিশ্লেষণের উপযোগী।</p>
                `;
            } else {
                qualityBanner.innerHTML = `
                    <h4><i class="fa-solid fa-circle-check"></i> Dataset Status: Perfect & Clean!</h4>
                    <p>Excellent! The dataset has <strong>0 missing values</strong> and <strong>0 duplicates</strong>. It is clean and ready for analytical modeling.</p>
                `;
            }
        } else {
            qualityBanner.className = 'quality-banner dirty';
            
            let issuesDesc = [];
            let issuesDescBn = [];
            if (totalMissing > 0) {
                issuesDesc.push(`<strong>${totalMissing} missing cells</strong>`);
                issuesDescBn.push(`<strong>${totalMissing} টি ফাঁকা সেল (Missing cells)</strong>`);
            }
            if (duplicateCount > 0) {
                issuesDesc.push(`<strong>${duplicateCount} duplicate rows</strong>`);
                issuesDescBn.push(`<strong>${duplicateCount} টি ডুপ্লিকেট সারি</strong>`);
            }

            if (currentLang === 'bn') {
                qualityBanner.innerHTML = `
                    <h4><i class="fa-solid fa-circle-exclamation"></i> ডেটার মান: প্রিপ্রোসেসিং প্রয়োজন</h4>
                    <p>আমরা এই ডাটাসেটে কিছু সমস্যা পেয়েছি: ${issuesDescBn.join(' এবং ')}। সঠিক বিশ্লেষণের জন্য এই ডেটা ক্লিন করতে হবে (যেমন ফাঁকা মান পূরণ করা বা ডুপ্লিকেট মুছে ফেলা)।</p>
                    <p style="margin-top: 8px; font-weight: 600;">
                        <i class="fa-solid fa-handshake"></i> এই ডাটাসেটটি অটোমেটিক ক্লিন করার জন্য পাইথন (Python) স্ক্রিপ্ট বা পাইপলাইন তৈরি করতে চান? <a href="#contact">আশফাক (Ashfak)</a> এর সাহায্য নিন!
                    </p>
                `;
            } else {
                qualityBanner.innerHTML = `
                    <h4><i class="fa-solid fa-circle-exclamation"></i> Dataset Status: Preprocessing Required</h4>
                    <p>We detected data quality issues: ${issuesDesc.join(' and ')}. For reliable analytics, these should be preprocessed (imputing missing values, removing duplicates, and standardizing features).</p>
                    <p style="margin-top: 8px; font-weight: 600;">
                        <i class="fa-solid fa-handshake"></i> Need assistance setting up an automated Python cleaning pipeline? Reach out to <a href="#contact">Ashfak</a> for professional data engineering!
                    </p>
                `;
            }
        }

        // Show Report & Scroll into View
        reportCard.style.display = 'flex';
        reportCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
});
