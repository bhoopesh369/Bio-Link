const hospital1 = {
    hospitalId: "medicalprovider1",
    doctors: [
        {
            doctorId: "doctor1",
            doctorName: "Dr. John Doe",
            doctorSpecialization: "Cardiologist",
            username: "doctor1",
            password: "doc1pass123"
        },
        {
            doctorId: "doctor2",
            doctorName: "Dr. Jonathon Doe",
            doctorSpecialization: "Dermitologist",
            username: "doctor2",
            password: "doc2pass123"
        }
    ],
    admin: {
        adminId: "mp1",
        adminName: "Admin-Hospital1",
        username: "mp1",
        password: "pass123"
    }
}

const hospital2 = {
    hospitalId: "medicalprovider2",
    doctors: [
        {
            doctorId: "doctor3",
            doctorName: "Dr. Mary Doe",
            doctorSpecialization: "Anesthesiologist",
            username: "doctor3",
            password: "doc3pass123"
        },
        {
            doctorId: "doctor4",
            doctorName: "Dr. Lewis Doe",
            doctorSpecialization: "Urologist",
            username: "doctor4",
            password: "doc4pass123"
        }
    ],
    admin: {
        adminId: "mp2",
        adminName: "Admin-Hospital2",
        username: "mp2",
        password: "pass123"
    }
}

exports.hospital1 = hospital1;
exports.hospital2 = hospital2;