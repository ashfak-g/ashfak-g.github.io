// ----------------------------------------------------
// Ashfak.dev Portfolio Skill Matrix Chart
// Uses Chart.js Radar Chart
// ----------------------------------------------------

document.addEventListener('DOMContentLoaded', () => {
    const ctx = document.getElementById('skillsChart');
    if (!ctx) return;

    // Custom dark mode theme styling for Chart.js
    const gridColor = 'rgba(255, 255, 255, 0.08)';
    const labelColor = '#9ca3af'; // var(--text-muted)
    const fontName = "'Inter', sans-serif";

    // Chart Configuration
    const config = {
        type: 'radar',
        data: {
            labels: [
                'Data Wrangling (Pandas/SQL)',
                'Machine Learning (Sklearn/XGB)',
                'Deep Learning (TF/PyTorch)',
                'Data Visualization (BI/Tableau)',
                'Statistical Analysis (R/Python)',
                'Big Data & Spark'
            ],
            datasets: [
                {
                    label: 'Self-Assessment',
                    data: [90, 85, 75, 80, 85, 70],
                    backgroundColor: 'rgba(6, 182, 212, 0.15)', // Neon Cyan with transparency
                    borderColor: '#06b6d4', // Neon Cyan
                    borderWidth: 2,
                    pointBackgroundColor: '#06b6d4',
                    pointBorderColor: '#070a13',
                    pointBorderWidth: 2,
                    pointRadius: 4,
                    pointHoverRadius: 6,
                },
                {
                    label: 'Target Goal',
                    data: [95, 90, 85, 85, 90, 80],
                    backgroundColor: 'rgba(99, 102, 241, 0.08)', // Indigo with transparency
                    borderColor: '#6366f1', // Indigo
                    borderWidth: 1.5,
                    borderDash: [5, 5], // Dashed line
                    pointBackgroundColor: '#6366f1',
                    pointBorderColor: '#070a13',
                    pointBorderWidth: 2,
                    pointRadius: 3,
                    pointHoverRadius: 5,
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        color: labelColor,
                        font: {
                            family: fontName,
                            size: 11,
                            weight: '500'
                        },
                        padding: 15
                    }
                },
                tooltip: {
                    backgroundColor: '#10162a',
                    titleColor: '#fff',
                    bodyColor: '#e2e8f0',
                    borderColor: 'rgba(255, 255, 255, 0.1)',
                    borderWidth: 1,
                    cornerRadius: 6,
                    padding: 10,
                    titleFont: {
                        family: fontName,
                        weight: '700'
                    },
                    bodyFont: {
                        family: fontName
                    }
                }
            },
            scales: {
                r: {
                    angleLines: {
                        color: gridColor
                    },
                    grid: {
                        color: gridColor
                    },
                    pointLabels: {
                        color: labelColor,
                        font: {
                            family: fontName,
                            size: 10,
                            weight: '600'
                        }
                    },
                    ticks: {
                        backdropColor: 'transparent',
                        color: 'rgba(255, 255, 255, 0.4)',
                        font: {
                            family: "'Fira Code', monospace",
                            size: 9
                        },
                        stepSize: 20
                    },
                    suggestedMin: 0,
                    suggestedMax: 100
                }
            }
        }
    };

    // Instantiate Chart
    new Chart(ctx, config);
});
