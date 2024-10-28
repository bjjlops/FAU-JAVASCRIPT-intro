//Proceudre analysis and calculate results
function performAnalysis() {

    const input = document.getElementById('numbersInput').value;
    const errorMessage = document.getElementById('errorMessage');
    const resultsSection = document.getElementById('resultsSection');
    errorMessage.style.display = 'none';
    errorMessage.innerHTML = '';

    //Chekcing if the input is empty
    if (input.trim() === '') {

        errorMessage.style.display = 'block';
        errorMessage.innerHTML = 'Please enter at least one number.';
        return;
    }

    //creates array and checks for invalid input
    const numberArray = input.split(',').map(item => item.trim());
    const invalidEntries = numberArray.filter(item => isNaN(item) || item === '');

    if (invalidEntries.length > 0) {

        //Output error message if invalid input is found
        errorMessage.style.display = 'block';
        errorMessage.innerHTML = 'Please enter valid numbers only. Letters or empty values are not allowed.';
        return;
    }

    //Convert the array to numbers after the check
    const validNumberArray = numberArray.map(Number);

    // Calculate statistics
    const mean = calculateMean(validNumberArray);
    const median = calculateMedian(validNumberArray);
    const mode = calculateMode(validNumberArray);
    const min = Math.min(...validNumberArray);
    const max = Math.max(...validNumberArray);
    const range = validNumberArray.length === 1 ? "Not applicable (only one value)" : max - min;

    //Display the results in list
    const resultsList = document.getElementById('resultsList');

    resultsList.innerHTML = `
        <li class="list-group-item">Mean: ${mean.toFixed(2)}</li>
        <li class="list-group-item">Median: ${median}</li>
        <li class="list-group-item">Mode: ${mode.length > 0 ? mode.join(', ') : 'No mode'}</li>
        <li class="list-group-item">Min: ${min}</li>
        <li class="list-group-item">Max: ${max}</li>
        <li class="list-group-item">Range: ${range}</li>
    `;

    resultsSection.style.display = 'block';
}

//Calculate the mean
function calculateMean(arr) {

    const sum = arr.reduce((a, b) => a + b, 0);
    return sum / arr.length;
}

//Calculate median
function calculateMedian(arr) {

    arr.sort((a, b) => a - b);
    const mid = Math.floor(arr.length / 2);
    return arr.length % 2 !== 0 ? arr[mid] : (arr[mid - 1] + arr[mid]) / 2;
}

//Calculate mode
function calculateMode(arr) {

    const frequency = {};
    arr.forEach(num => {
        frequency[num] = (frequency[num] || 0) + 1;
    });
    const maxFreq = Math.max(...Object.values(frequency));
    const modes = Object.keys(frequency).filter(num => frequency[num] === maxFreq);
    
    if (maxFreq === 1) return [];
    return modes.map(Number);
}
