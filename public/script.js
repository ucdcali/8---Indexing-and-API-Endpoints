document.getElementById('minPopulation').addEventListener('input', updateStates);
document.getElementById('maxPopulation').addEventListener('input', updateStates);

async function updateStates() {
  try {
    // Convert minPopulation and maxPopulation to numbers
    const minPopulation = parseInt(document.getElementById('minPopulation').value, 10);
    const maxPopulation = parseInt(document.getElementById('maxPopulation').value, 10);

    // Check if conversion results in NaN and handle the case appropriately
    if (isNaN(minPopulation) || isNaN(maxPopulation)) {
      console.error('Population values must be numeric');
      return; // Exit the function if values are not valid numbers
    }

    const response = await fetch('/api/states', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ minPopulation, maxPopulation }),
    });

    if (response.ok) {
      const states = await response.json();
      
      console.log(states);
      const container = document.getElementById('statesContainer');
      container.innerHTML = ''; // Clear previous results
      states.forEach(state => {
        let cleanUrl = state.flagImage + ".svg";

        const stateDiv = document.createElement('div');
        stateDiv.innerHTML = `
          <h2>${state.name}</h2>
          <img src="/flags/${cleanUrl}" alt="Flag of ${state.name}" style="width:100px;">
          <p>Population: ${state.population.toLocaleString()}</p>
        `;
        container.appendChild(stateDiv);
      });
    } else {
      console.error('Response not ok with status:', response.status);
    }
  } catch (error) {
    console.error('Fetch error:', error.message);
  }
}

updateStates();
