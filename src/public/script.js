const sendButton = document.querySelector('#test-button');
const resetButton = document.querySelector('#reset-button');
const limitSelect = document.querySelector('#limit-select');
const timerDiv = document.querySelector('#timer');
const resultDiv = document.querySelector('#result');
const pingUrl = '/api/ping';

const onSendButtonClick = e => {
    e.preventDefault();

    const requestLimit = parseInt(limitSelect.value);
    let singleRequests = 0;
    let doubleRequests = 0;

    switch (requestLimit) {
        case 5:
            singleRequests = 5;
            break;
        case 10:
            singleRequests = 10;
            break;
        case 15:
            singleRequests = 5;
            doubleRequests = 5;
            break;
        case 20:
            doubleRequests = 10;
            break;
        default:
            break;
    }

    let successfullRequests = 0;
    let blockedRequests = 0;
    let counter = 10;
    let interval;

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

    interval = setInterval(async () => {
        let requests = [];
        counter--;

        if (counter) {
            timerDiv.innerHTML = `${counter} seconds left`;
        }

        if (doubleRequests) {
            for (let i = 0; i < 2; i++) {
                requests.push(callPing());
            }

            doubleRequests--;
        }

        if (!doubleRequests && singleRequests) {
            requests.push(callPing());

            singleRequests--;
        }

        await Promise.all(requests);
    }, 1000);

    setTimeout(() => {
        resetButton.classList.remove('d-none');
        sendButton.disabled = false;
        limitSelect.disabled = false;
        timerDiv.innerHTML = '';
        clearInterval(interval);

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
