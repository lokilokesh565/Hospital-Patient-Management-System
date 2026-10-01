// ===============================
// ELEMENTS
// ===============================

const form = document.getElementById("patientForm");
const searchForm = document.getElementById("searchForm");
const searchResults = document.getElementById("searchResults");
const viewAllBtn = document.getElementById("viewAllBtn");
const totalPatients = document.getElementById("totalPatients");
const submitBtn = document.getElementById("submitBtn");

const API_URL = "http://localhost:8080/api/patients";

let editingPatientId = null;


// ===============================
// LOAD TOTAL PATIENTS
// ===============================

async function loadPatientCount() {
    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error("Failed to load patients");
        }

        const patients = await response.json();

        if (totalPatients) {
            totalPatients.textContent = patients.length;
        }

    } catch (error) {
        console.error("Count error:", error);

        if (totalPatients) {
            totalPatients.textContent = "—";
        }
    }
}


// ===============================
// ADD / UPDATE PATIENT
// ===============================

form.addEventListener("submit", async function (event) {

    event.preventDefault();

    const patient = {
        name: document.getElementById("name").value.trim(),
        age: Number(document.getElementById("age").value),
        gender: document.getElementById("gender").value,
        phone: document.getElementById("phone").value.trim(),
        disease: document.getElementById("disease").value.trim(),
        treatment: document.getElementById("treatment").value.trim(),
        medications: document.getElementById("medications").value.trim(),
        doctor: document.getElementById("doctor").value.trim(),
        admissionDate: document.getElementById("admissionDate").value
    };


    try {

        // =========================================
        // UPDATE EXISTING PATIENT
        // =========================================

        if (editingPatientId !== null) {

            const response = await fetch(
                `${API_URL}/${editingPatientId}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(patient)
                }
            );


            if (!response.ok) {
                const errorText = await response.text();
                console.error("Update error:", errorText);
                throw new Error("Failed to update patient");
            }


            await response.json();


            alert("✅ Patient details updated successfully!");


            // Exit edit mode
            editingPatientId = null;


            // Reset form
            form.reset();


            // Change button back
            if (submitBtn) {
                submitBtn.textContent = "Add Patient";
            }


            // Refresh
            await loadPatientCount();
            await loadAllPatients();

            return;
        }


        // =========================================
        // ADD NEW PATIENT
        // =========================================

        const response = await fetch(
            API_URL,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(patient)
            }
        );


        if (!response.ok) {
            const errorText = await response.text();
            console.error("Add error:", errorText);
            throw new Error("Failed to add patient");
        }


        const savedPatient = await response.json();


        alert(
            "✅ Patient added successfully!\n\n" +
            "Patient ID: " +
            savedPatient.id
        );


        form.reset();


        await loadPatientCount();
        await loadAllPatients();


    } catch (error) {

        console.error("Submit error:", error);

        alert(
            "❌ Failed to save patient.\n\n" +
            "Check that Spring Boot is running on port 8080."
        );
    }
});


// ===============================
// SEARCH PATIENT
// ===============================

searchForm.addEventListener("submit", async function (event) {

    event.preventDefault();

    const keyword =
        document.getElementById("search").value.trim();


    if (keyword === "") {
        alert("Please enter a patient name or phone number.");
        return;
    }


    try {

        const response = await fetch(
            `${API_URL}/search?keyword=${encodeURIComponent(keyword)}`
        );


        if (!response.ok) {
            throw new Error("Search failed");
        }


        const patients = await response.json();

        displayPatients(patients);


    } catch (error) {

        console.error("Search error:", error);

        searchResults.innerHTML = `
            <div class="no-result">
                <h3>⚠️ Backend Connection Failed</h3>
                <p>
                    Make sure Spring Boot is running
                    on port 8080.
                </p>
            </div>
        `;
    }
});


// ===============================
// VIEW ALL PATIENTS
// ===============================

if (viewAllBtn) {

    viewAllBtn.addEventListener(
        "click",
        loadAllPatients
    );

}


async function loadAllPatients() {

    try {

        const response = await fetch(API_URL);


        if (!response.ok) {
            throw new Error("Failed to load patients");
        }


        const patients = await response.json();

        displayPatients(patients);


    } catch (error) {

        console.error("Load patients error:", error);

        searchResults.innerHTML = `
            <div class="no-result">
                <h3>⚠️ Backend Connection Failed</h3>
                <p>
                    Make sure Spring Boot is running
                    on port 8080.
                </p>
            </div>
        `;
    }
}


// ===============================
// DISPLAY PATIENTS
// ===============================

function displayPatients(patients) {

    if (!patients || patients.length === 0) {

        searchResults.innerHTML = `
            <div class="no-result">
                <h3>🔍 No Patients Found</h3>
                <p>No patient records are available.</p>
            </div>
        `;

        return;
    }


    searchResults.innerHTML = "";


    patients.forEach(patient => {

        const patientCard =
            document.createElement("div");


        patientCard.className =
            "patient-card";


        patientCard.innerHTML = `

            <div class="patient-header">

                <h3>
                    👤 ${patient.name}
                </h3>

            </div>


            <div class="patient-info">

                <div class="info-item">
                    <span>Patient ID</span>
                    <strong>#${patient.id}</strong>
                </div>


                <div class="info-item">
                    <span>Age</span>
                    <strong>${patient.age}</strong>
                </div>


                <div class="info-item">
                    <span>Gender</span>
                    <strong>${patient.gender}</strong>
                </div>


                <div class="info-item">
                    <span>Phone</span>
                    <strong>${patient.phone}</strong>
                </div>


                <div class="info-item">
                    <span>Disease</span>
                    <strong>${patient.disease}</strong>
                </div>


                <div class="info-item">
                    <span>Doctor</span>
                    <strong>🩺 ${patient.doctor}</strong>
                </div>


                <div class="info-item">
                    <span>Admission Date</span>
                    <strong>${patient.admissionDate}</strong>
                </div>


                <div class="info-item">
                    <span>Treatment</span>
                    <strong>${patient.treatment}</strong>
                </div>


                <div class="info-item">
                    <span>Medications</span>
                    <strong>${patient.medications}</strong>
                </div>

            </div>


            <div class="patient-actions">

                <button
                    class="edit-btn"
                    onclick="editPatient(${patient.id})">
                    ✏️ Edit Patient
                </button>


                <button
                    class="delete-btn"
                    onclick="deletePatient(${patient.id})">
                    🗑️ Delete Patient
                </button>

            </div>
        `;


        searchResults.appendChild(patientCard);

    });
}


// ===============================
// EDIT PATIENT
// ===============================

async function editPatient(id) {

    try {

        console.log("Editing patient ID:", id);


        const response = await fetch(
            `${API_URL}/${id}`
        );


        if (!response.ok) {

            const errorText = await response.text();

            console.error(
                "Get patient error:",
                response.status,
                errorText
            );

            throw new Error(
                "Failed to load patient"
            );
        }


        const patient = await response.json();


        console.log(
            "Patient loaded:",
            patient
        );


        // =====================================
        // FILL FORM WITH EXISTING DATA
        // =====================================

        document.getElementById("name").value =
            patient.name || "";

        document.getElementById("age").value =
            patient.age || "";

        document.getElementById("gender").value =
            patient.gender || "";

        document.getElementById("phone").value =
            patient.phone || "";

        document.getElementById("disease").value =
            patient.disease || "";

        document.getElementById("treatment").value =
            patient.treatment || "";

        document.getElementById("medications").value =
            patient.medications || "";

        document.getElementById("doctor").value =
            patient.doctor || "";

        document.getElementById("admissionDate").value =
            patient.admissionDate || "";


        // =====================================
        // IMPORTANT:
        // STORE ID IN EDITING VARIABLE
        // =====================================

        editingPatientId = patient.id;


        console.log(
            "Edit mode ID:",
            editingPatientId
        );


        // =====================================
        // CHANGE BUTTON
        // =====================================

        if (submitBtn) {

            submitBtn.textContent =
                "Update Patient";

        }


        // =====================================
        // SCROLL TO FORM
        // =====================================

        form.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });


    } catch (error) {

        console.error(
            "Edit error:",
            error
        );


        alert(
            "❌ Failed to load patient details."
        );
    }
}


// ===============================
// DELETE PATIENT
// ===============================

async function deletePatient(id) {

    const confirmDelete = confirm(
        "Are you sure you want to delete this patient?"
    );


    if (!confirmDelete) {
        return;
    }


    try {

        const response = await fetch(
            `${API_URL}/${id}`,
            {
                method: "DELETE"
            }
        );


        if (!response.ok) {

            const errorText =
                await response.text();

            console.error(
                "Delete error:",
                errorText
            );

            throw new Error(
                "Delete failed"
            );
        }


        alert(
            "✅ Patient deleted successfully!"
        );


        await loadPatientCount();

        await loadAllPatients();


    } catch (error) {

        console.error(
            "Delete error:",
            error
        );


        alert(
            "❌ Failed to delete patient!"
        );
    }
}


// ===============================
// CANCEL EDIT
// ===============================

function cancelEdit() {

    editingPatientId = null;

    form.reset();


    if (submitBtn) {
        submitBtn.textContent =
            "Add Patient";
    }
}


// ===============================
// INITIAL LOAD
// ===============================

loadPatientCount();