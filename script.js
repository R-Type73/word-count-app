document.addEventListener('DOMContentLoaded', function() {
    const textInput = document.getElementById('textInput');
    const wordCountDisplay = document.getElementById('wordCount');
    const charCountDisplay = document.getElementById('charCount');
    const charCountNoSpacesDisplay = document.getElementById('charCountNoSpaces');
    const clearButton = document.getElementById('clearButton');

    textInput.addEventListener('input', updateCounts);
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

    function clearText() {
        textInput.value = '';
        updateCounts();
    }
});