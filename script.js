document.addEventListener('DOMContentLoaded', function() {
    const textInput = document.getElementById('textInput');
    const wordCountDisplay = document.getElementById('wordCount');
    const charCountDisplay = document.getElementById('charCount');
    const charCountNoSpacesDisplay = document.getElementById('charCountNoSpaces');
    const clearButton = document.getElementById('clearButton');
    
    let chartInstance;

    textInput.addEventListener('input', function() {
        updateCounts();
        updateChart();
    });
    clearButton.addEventListener('click', clearText);

    function updateCounts() {
        const text = textInput.value;
        const words = text.match(/\b[-?(\w+)?]+\b/gi) || [];
        const wordCount = words.length;
        const charCount = text.length;
        const charCountNoSpaces = text.replace(/\s+/g, '').length;

        wordCountDisplay.textContent = wordCount;
        charCountDisplay.textContent = charCount;
        charCountNoSpacesDisplay.textContent = charCountNoSpaces;
    }

    function updateChart() {
        const text = textInput.value;
        const frequencies = calculateFrequencies(text);
        const labels = Object.keys(frequencies);
        const data = Object.values(frequencies);

        if (chartInstance) {
            chartInstance.destroy(); // Destroy previous chart instance if exists
        }

        const ctx = document.getElementById('charFrequencyChart').getContext('2d');
        chartInstance = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Character Frequency',
                    data: data,
                    backgroundColor: 'rgba(0, 123, 255, 0.5)',
                    borderColor: 'rgba(0, 123, 255, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    function calculateFrequencies(text) {
        const frequencies = {};
        for (let char of text) {
            if (char.trim()) { // ignore spaces
                frequencies[char] = (frequencies[char] || 0) + 1;
            }
        }
        return frequencies;
    }

    function clearText() {
        textInput.value = '';
        updateCounts();
        if (chartInstance) {
            chartInstance.destroy();
        }
    }
});