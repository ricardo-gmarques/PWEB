const processNumberInput = document.getElementById("processNumber");
const processYearInput = document.getElementById("processYear");
const localInput = document.getElementById("local");
const expiryDateInput = document.getElementById("expiryDate");
const addProcessBtn = document.getElementById("addProcessBtn");
const processList = document.getElementById("processList");
const filterInput = document.getElementById("filterInput");
const filterDateInput = document.getElementById("filterDateInput");
const exportBtn = document.getElementById("exportBtn");

// Função para carregar os processos
function loadProcesses() {
    const processes = JSON.parse(localStorage.getItem("processes")) || [];
    return processes;
}

// Função para salvar os processos no localStorage
function saveProcesses(processes) {
    localStorage.setItem("processes", JSON.stringify(processes));
}

// Função para renderizar os processos
function renderProcesses() {
    const processes = loadProcesses();
    processList.innerHTML = '';

    const filterText = filterInput.value.toLowerCase();
    const filterDate = filterDateInput.value;

    processes.forEach((process, index) => {
        if (!process.name.toLowerCase().includes(filterText)) return;
        if (filterDate && !process.generatedDate.startsWith(filterDate)) return;

        const expiryDate = new Date(process.expiryDate);
        const currentDate = new Date();
        const isExpiring = expiryDate - currentDate <= 3600000;
        const isExpired = expiryDate <= currentDate;

        const processElement = document.createElement("div");
        processElement.classList.add("activity");

        if (isExpired) processElement.classList.add("expired");
        else if (isExpiring) processElement.classList.add("expiring");

        processElement.innerHTML = `
            <span><strong>${process.name}</strong> - Local: ${process.local} - Expira em: ${expiryDate.toLocaleString()} | Criado em: ${new Date(process.generatedDate).toLocaleString()}</span>
            <div>
                <button onclick="deleteProcess(${index})">Excluir</button>
                <button onclick="editProcess(${index})">Editar</button>
            </div>
        `;

        processList.appendChild(processElement);
    });
}

// Função para adicionar um novo processo
function addProcess() {
    const processNumber = processNumberInput.value.trim();
    const processYear = processYearInput.value.trim();
    const local = localInput.value.trim();
    const expiryDate = expiryDateInput.value.trim();

    if (!processNumber || !processYear || processNumber < 1 || processNumber > 99999 || processYear.length !== 4) {
        alert("Por favor, insira um número de processo válido (1 a 5 dígitos) e um ano válido (4 dígitos).");
        return;
    }

    if (expiryDate && local) {
        const processes = loadProcesses();
        const processName = `${processNumber}/${processYear}`;
        const newProcess = {
            name: processName,
            local: local,
            expiryDate: expiryDate,
            generatedDate: new Date().toISOString(),
            notified: false
        };
        processes.push(newProcess);
        saveProcesses(processes);
        renderProcesses();
        processNumberInput.value = '';
        processYearInput.value = '';
        localInput.value = '';
        expiryDateInput.value = '';
    } else {
        alert("Por favor, preencha todos os campos.");
    }
}

// Função para excluir um processo
function deleteProcess(index) {
    const processes = loadProcesses();
    processes.splice(index, 1);
    saveProcesses(processes);
    renderProcesses();
}

// Função para editar um processo
function editProcess(index) {
    const processes = loadProcesses();
    const process = processes[index];

    processNumberInput.value = process.name.split("/")[0];
    processYearInput.value = process.name.split("/")[1];
    localInput.value = process.local;
    expiryDateInput.value = process.expiryDate;

    processes.splice(index, 1);
    saveProcesses(processes);
    renderProcesses();
}

// Exportação dos processos
exportBtn.addEventListener("click", () => {
    const processes = loadProcesses();
    const exportType = document.querySelector("input[name='exportType']:checked");

    if (!exportType) {
        alert("Por favor, selecione o formato de exportação.");
        return;
    }

    if (exportType.value === "pdf") {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        doc.text("Relatório de Processos Administrativos", 20, 20);
        processes.forEach((process, index) => {
            doc.text(`${index + 1}. ${process.name} - Local: ${process.local} - Expira: ${process.expiryDate}`, 20, 30 + (index * 10));
        });
        doc.save("relatorio_processos.pdf");
    } else if (exportType.value === "excel") {
        const ws = XLSX.utils.json_to_sheet(processes);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Processos");
        XLSX.writeFile(wb, "relatorio_processos.xlsx");
    }
});

// Event listeners
addProcessBtn.addEventListener("click", addProcess);
filterInput.addEventListener("input", renderProcesses);
filterDateInput.addEventListener("input", renderProcesses);

// Renderizar processos ao carregar a página
renderProcesses();
