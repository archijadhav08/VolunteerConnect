console.log("App.js Loaded Successfully");

/* ===============================
   SAVE PROFILE
================================*/
const profileForm = document.getElementById("profileForm");

if (profileForm) {

    profileForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const name = document.getElementById("name").value;
        const location = document.getElementById("location").value;
        const skills = document.getElementById("skills").value;
        const interests = document.getElementById("interests").value;
        const about = document.getElementById("about").value;

        let volunteers =
            JSON.parse(localStorage.getItem("volunteers")) || [];

        volunteers.push({
            name,
            location,
            skills,
            interests,
            about
        });

        localStorage.setItem(
            "volunteers",
            JSON.stringify(volunteers)
        );

        alert("Profile Saved Successfully ✅");

        // Redirect to directory page
        window.location.href = "directory.html";
    });
}

/* ===============================
   DISPLAY DIRECTORY
================================*/
const directoryDiv = document.getElementById("directory");

function displayVolunteers(data) {

    if (!directoryDiv) return;

    directoryDiv.innerHTML = "";

    if (data.length === 0) {
        directoryDiv.innerHTML = "<p>No Volunteers Found</p>";
        return;
    }

    data.forEach((volunteer, index) => {

        const card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
            <h3>${volunteer.name}</h3>
            <p><b>Location:</b> ${volunteer.location}</p>
            <p><b>Skills:</b> ${volunteer.skills}</p>
            <p><b>Interests:</b> ${volunteer.interests}</p>
            <p>${volunteer.about}</p>

            <button onclick="deleteVolunteer(${index})">
                Delete
            </button>
        `;

        directoryDiv.appendChild(card);
    });
}

/* ===============================
   LOAD DATA
================================*/
function loadVolunteers() {

    let volunteers =
        JSON.parse(localStorage.getItem("volunteers")) || [];

    displayVolunteers(volunteers);
}

// Run only if directory page exists
if (directoryDiv) {
    loadVolunteers();
}

/* ===============================
   DELETE VOLUNTEER
================================*/
function deleteVolunteer(index) {

    let volunteers =
        JSON.parse(localStorage.getItem("volunteers")) || [];

    volunteers.splice(index, 1);

    localStorage.setItem(
        "volunteers",
        JSON.stringify(volunteers)
    );

    loadVolunteers();
}

/* ===============================
   SEARCH FUNCTION
================================*/
const searchBtn = document.getElementById("searchBtn");

if (searchBtn) {

    searchBtn.addEventListener("click", function () {

        const searchValue =
            document.getElementById("searchInput")
            .value
            .toLowerCase();

        let volunteers =
            JSON.parse(localStorage.getItem("volunteers")) || [];

        const filtered = volunteers.filter(v =>
            v.location.toLowerCase().includes(searchValue) ||
            v.interests.toLowerCase().includes(searchValue) ||
            v.skills.toLowerCase().includes(searchValue)
        );

        displayVolunteers(filtered);
    });
}