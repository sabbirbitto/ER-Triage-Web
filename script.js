let patients = [];

console.log("ER Triage System Started");


// ========================================
// Calculate Acuity Score
// ========================================

function calculateAcuityScore(severity, hr, bp, rr) {

    let score = severity * 10;


    // Heart Rate
    if (hr < 50 || hr > 120) {

        score += 15;

    }
    else if (hr < 60 || hr > 100) {

        score += 5;

    }


    // Blood Pressure
    if (bp < 90 || bp > 160) {

        score += 15;

    }
    else if (bp < 100 || bp > 140) {

        score += 5;

    }


    // Respiratory Rate
    if (rr < 10 || rr > 26) {

        score += 15;

    }
    else if (rr < 12 || rr > 20) {

        score += 5;

    }


    return score;
}



// ========================================
// Display Patients
// Highest Score First
// ========================================

function displayPatients() {

    const tableBody =
        document.getElementById("patientTableBody");


    tableBody.innerHTML = "";


    // Sort by highest acuity score

    const sortedPatients =
        [...patients].sort(

            (a, b) =>
                b.acuityScore - a.acuityScore

        );


    sortedPatients.forEach(function(patient) {

        const row =
            document.createElement("tr");


        row.innerHTML = `

            <td>${patient.patientID}</td>

            <td>${patient.name}</td>

            <td>${patient.age}</td>

            <td>${patient.severity}</td>

            <td>${patient.heartRate}</td>

            <td>${patient.bloodPressure}</td>

            <td>${patient.respiratoryRate}</td>

            <td><strong>${patient.acuityScore}</strong></td>

        `;


        tableBody.appendChild(row);

    });

}



// ========================================
// Register Patient
// ========================================

function registerPatient() {

    const id =
        document.getElementById("patientID").value.trim();


    const name =
        document.getElementById("patientName").value.trim();


    const age =
        Number(
            document.getElementById("age").value
        );


    const severity =
        Number(
            document.getElementById("severity").value
        );


    const heartRate =
        Number(
            document.getElementById("heartRate").value
        );


    const bloodPressure =
        Number(
            document.getElementById("bloodPressure").value
        );


    const respiratoryRate =
        Number(
            document.getElementById("respiratoryRate").value
        );



    // Basic validation

    if (
        !id ||
        !name ||
        !age ||
        !severity ||
        !heartRate ||
        !bloodPressure ||
        !respiratoryRate
    ) {

        alert("Please fill in all patient information.");

        return;

    }



    // Severity validation

    if (severity < 1 || severity > 5) {

        alert("Severity must be between 1 and 5.");

        return;

    }



    // Check duplicate Patient ID

    const existingPatient =
        patients.find(

            patient =>
                patient.patientID === id

        );


    if (existingPatient) {

        alert(
            "Patient with this ID already exists!"
        );

        return;

    }



    // Calculate Acuity Score

    const acuityScore =
        calculateAcuityScore(

            severity,

            heartRate,

            bloodPressure,

            respiratoryRate

        );



    // Create Patient Object

    const patient = {

        patientID: id,

        name: name,

        age: age,

        severity: severity,

        heartRate: heartRate,

        bloodPressure: bloodPressure,

        respiratoryRate: respiratoryRate,

        acuityScore: acuityScore

    };



    // Add patient

    patients.push(patient);



    // Update table

    displayPatients();



    // Success message

    alert(

        "Patient registered successfully!\n\n" +

        "Patient: " + name + "\n" +

        "Acuity Score: " + acuityScore

    );

}



// ========================================
// Search Patient
// ========================================

function searchPatient() {

    const searchID =
        document
            .getElementById("searchPatientID")
            .value
            .trim();


    const patient =
        patients.find(

            patient =>
                patient.patientID === searchID

        );


    if (patient) {

        alert(

            "Patient Found!\n\n" +

            "Patient ID: " +
            patient.patientID + "\n" +

            "Name: " +
            patient.name + "\n" +

            "Age: " +
            patient.age + "\n" +

            "Severity: " +
            patient.severity + "\n" +

            "Heart Rate: " +
            patient.heartRate + "\n" +

            "Blood Pressure: " +
            patient.bloodPressure + "\n" +

            "Respiratory Rate: " +
            patient.respiratoryRate + "\n" +

            "Acuity Score: " +
            patient.acuityScore

        );

    }

    else {

        alert("Patient not found!");

    }

}



// ========================================
// Update Patient Vitals
// ========================================

function updatePatient() {

    const patientID =
        document
            .getElementById("updatePatientID")
            .value
            .trim();


    const newHeartRate =
        Number(
            document
                .getElementById("updateHeartRate")
                .value
        );


    const newBloodPressure =
        Number(
            document
                .getElementById("updateBloodPressure")
                .value
        );


    const newRespiratoryRate =
        Number(
            document
                .getElementById("updateRespiratoryRate")
                .value
        );



    // Find patient

    const patient =
        patients.find(

            patient =>
                patient.patientID === patientID

        );


    if (!patient) {

        alert("Patient not found!");

        return;

    }



    // Validate values

    if (
        !newHeartRate ||
        !newBloodPressure ||
        !newRespiratoryRate
    ) {

        alert(
            "Please enter all new vital signs."
        );

        return;

    }



    // Update vital signs

    patient.heartRate =
        newHeartRate;


    patient.bloodPressure =
        newBloodPressure;


    patient.respiratoryRate =
        newRespiratoryRate;



    // Recalculate score

    patient.acuityScore =
        calculateAcuityScore(

            patient.severity,

            newHeartRate,

            newBloodPressure,

            newRespiratoryRate

        );



    // Refresh table

    displayPatients();



    // Success message

    alert(

        "Patient updated successfully!\n\n" +

        "Patient: " +
        patient.name + "\n" +

        "New Acuity Score: " +
        patient.acuityScore

    );

}



// ========================================
// Dispatch Highest Priority Patient
// ========================================

function dispatchHighestPriorityPatient() {

    // Check if queue is empty

    if (patients.length === 0) {

        alert(
            "No patients are currently waiting."
        );

        return;

    }



    // Find patient with highest score

    let highestPriorityIndex = 0;


    for (
        let i = 1;
        i < patients.length;
        i++
    ) {

        if (
            patients[i].acuityScore >
            patients[highestPriorityIndex].acuityScore
        ) {

            highestPriorityIndex = i;

        }

    }



    // Remove highest priority patient

    const dispatchedPatient =
        patients.splice(
            highestPriorityIndex,
            1
        )[0];



    // Update table

    displayPatients();



    // Show dispatch message

    alert(

        "Patient Dispatched Successfully!\n\n" +

        "Patient ID: " +
        dispatchedPatient.patientID + "\n" +

        "Name: " +
        dispatchedPatient.name + "\n" +

        "Acuity Score: " +
        dispatchedPatient.acuityScore

    );

}



// ========================================
// Refresh Queue
// ========================================

function refreshQueue() {

    displayPatients();

    alert("Queue refreshed successfully!");

}



// ========================================
// Register Button
// ========================================

document
    .getElementById("registerButton")
    .addEventListener(
        "click",
        registerPatient
    );



// ========================================
// Search Button
// ========================================

document
    .getElementById("searchButton")
    .addEventListener(
        "click",
        searchPatient
    );



// ========================================
// Update Button
// ========================================

document
    .getElementById("updateButton")
    .addEventListener(
        "click",
        updatePatient
    );



// ========================================
// Dispatch Button
// ========================================

document
    .getElementById("dispatchButton")
    .addEventListener(
        "click",
        dispatchHighestPriorityPatient
    );



// ========================================
// Refresh Button
// ========================================

document
    .getElementById("refreshButton")
    .addEventListener(
        "click",
        refreshQueue
    );