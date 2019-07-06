document.addEventListener('DOMContentLoaded', function() {
    var stateSelect = document.querySelector('#select-state');
    var citiesSelect = document.querySelector('#select-cities');

    axios
        .get('http://localhost:8000/states')
        .then(res => {
            // for(var state of res.data) {
            //     var optionState = new Option(state.name, state.id);
            //     stateSelect.appendChild(optionState);
            // }
            var allStateOptions = res.data.map(
                state => new Option(state.name, state.id)
            );
            allStateOptions.forEach(stateOption => {
                stateSelect.appendChild(stateOption);
            });
        })
        .catch(error => {
            console.error(error);
        });

    // stateSelect.onchange = event => {}
    stateSelect.addEventListener('change', event => {
        // Limpa o select de cidades
        citiesSelect.innerHTML = '';

        var stateIdQueUsuarioEscolheu = event.target.value;

        if (stateIdQueUsuarioEscolheu === '') return;
        // http://localhost:8000/cities?stateId=1
        axios
            .get(
                'http://localhost:8000/cities?stateId=' +
                    stateIdQueUsuarioEscolheu
            )
            .then(res => {
                var allCitiesOptions = res.data.map(
                    city => new Option(city.name, city.id)
                );
                for (var cityOption of allCitiesOptions) {
                    citiesSelect.appendChild(cityOption);
                }
            })
            .catch(error => {
                console.error(error);
            });
    });
});
