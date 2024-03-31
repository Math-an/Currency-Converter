document.addEventListener('DOMContentLoaded', () => {
    let select = document.querySelectorAll('.currency');
    let input = document.getElementById('input');
    let input2 = document.getElementById('input2');
    let ex = document.getElementById('exchange');

    fetch('https://api.frankfurter.app/currencies')
        .then(res => res.json())
        .then(res => displayDropDown(res))

    function displayDropDown(res) {
        let curr = Object.entries(res);
        for (let i = 0; i < curr.length; i++) {
            let opt = `<option value="${curr[i][0]}">${curr[i][0]}</option>`;
            select[0].innerHTML += opt;
            select[1].innerHTML += opt;
        }
    }

    ex.addEventListener('click', () => {
        let temp = select[0].value;
        select[0].value = select[1].value;
        select[1].value = temp;
        convert();
    });

    input.addEventListener('input', convert);

    function convert() {
        let curr1 = select[0].value;
        let curr2 = select[1].value;
        let inputVal = input.value;
        if(curr1===curr2)
        {
            alert("choose different country")
        }
        else{
        const host = 'api.frankfurter.app';
        fetch(`https://${host}/latest?amount=${inputVal}&from=${curr1}&to=${curr2}`)
            .then(resp => resp.json())
            .then((data) => {
                input2.value = Object.values(data.rates)[0];
            });
        }
    }
});