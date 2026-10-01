package com.hospital.backend.controller;

import com.hospital.backend.entity.Patient;
import com.hospital.backend.repository.PatientRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/patients")
@CrossOrigin(origins = "*")
public class PatientController {

    private final PatientRepository patientRepository;

    public PatientController(PatientRepository patientRepository) {
        this.patientRepository = patientRepository;
    }

    // ADD PATIENT
    @PostMapping
    public Patient addPatient(@RequestBody Patient patient) {
        return patientRepository.save(patient);
    }

    // GET ALL PATIENTS
    @GetMapping
    public List<Patient> getAllPatients() {
        return patientRepository.findAll();
    }

    // GET PATIENT BY ID
    @GetMapping("/{id}")
    public Patient getPatientById(@PathVariable Long id) {
        return patientRepository.findById(id).orElse(null);
    }

    // SEARCH PATIENT BY NAME OR PHONE
    @GetMapping("/search")
    public List<Patient> searchPatients(@RequestParam String keyword) {
        return patientRepository
                .findByNameContainingIgnoreCaseOrPhoneContaining(
                        keyword,
                        keyword
                );
    }

    @PutMapping("/{id}")
public Patient updatePatient(
        @PathVariable Long id,
        @RequestBody Patient patient) {

    Patient existingPatient =
            patientRepository.findById(id).orElse(null);

    if (existingPatient == null) {
        return null;
    }

    existingPatient.setName(patient.getName());
    existingPatient.setAge(patient.getAge());
    existingPatient.setGender(patient.getGender());
    existingPatient.setPhone(patient.getPhone());
    existingPatient.setDisease(patient.getDisease());
    existingPatient.setTreatment(patient.getTreatment());
    existingPatient.setMedications(patient.getMedications());
    existingPatient.setDoctor(patient.getDoctor());
    existingPatient.setAdmissionDate(patient.getAdmissionDate());

    return patientRepository.save(existingPatient);
}

    // DELETE PATIENT
    @DeleteMapping("/{id}")
    public String deletePatient(@PathVariable Long id) {

        if (patientRepository.existsById(id)) {
            patientRepository.deleteById(id);
            return "Patient deleted successfully";
        }

        return "Patient not found";
    }
}
