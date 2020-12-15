const sendButton = document.querySelector('#test-button');
const resetButton = document.querySelector('#reset-button');
const limitSelect = document.querySelector('#limit-select');
const timerDiv = document.querySelector('#timer');
const resultDiv = document.querySelector('#result');
const pingUrl = '/api/ping';

const onSendButtonClick = e => {
    e.preventDefault();

    let successfullRequests = 0;
    let blockedRequests = 0;
    let counter = 10;
    let requestInterval;
    let tick = 0,
        requestsSentCount = 0;
    const requestsToSend = parseInt(limitSelect.value);
    const whenToSendTick = Math.ceil(100 / requestsToSend);

    sendButton.disabled = true;
    limitSelect.disabled = true;

    const callPing = async () => {
        try {
            await axios.get(pingUrl, {
                headers: {
                    'Cache-Control': 'no-cache, no-store, must-revalidate',
                    Pragma: 'no-cache',
                    Expires: '0'
                }
            });

            successfullRequests++;
        } catch (err) {
            blockedRequests++;
        }
    };

    timerDiv.innerHTML = `${counter} seconds left`;

    requestInterval = setInterval(async () => {
        if (tick % whenToSendTick === 0) {
            await callPing();
        }

        if (requestsSentCount === requestsToSend) {
            clearInterval(requestInterval);
        }

        tick++;
    }, 100);

    counterInterval = setInterval(() => {
        counter--;

        if (counter) {
            timerDiv.innerHTML = `${counter} seconds left`;
        }
    }, 1000);

    setTimeout(() => {
        resetButton.classList.remove('d-none');
        sendButton.disabled = false;
        limitSelect.disabled = false;
        timerDiv.innerHTML = '';
        clearInterval(requestInterval);
        clearInterval(counterInterval);

        let result = document.createElement('p');

        result.classList.add('lead');
        result.innerHTML = `Sent ${limitSelect.value} requests. `;

        if (successfullRequests) {
            const successfullMessage = document.createElement('span');

            successfullMessage.style.color = 'green';
            successfullMessage.innerHTML = `Handled ${successfullRequests} requests. `;
            result.appendChild(successfullMessage);
        }

        if (blockedRequests) {
            const limitedMessage = document.createElement('span');

            limitedMessage.style.color = 'red';
            limitedMessage.innerHTML = `${blockedRequests} requests blocked `;
            result.appendChild(limitedMessage);
        }

        resultDiv.appendChild(result);
    }, 10 * 1000 + 100);
};

const onResetButtonClick = e => {
    e.preventDefault();

    sendButton.disabled = false;
    resultDiv.innerHTML = '';
    resetButton.classList.add('d-none');
};

document.addEventListener(
    'DOMContentLoaded',
    () => {
        limitSelect.value = 5;
    },
    false
);

sendButton.addEventListener('click', onSendButtonClick);

resetButton.addEventListener('click', onResetButtonClick);
