        const all_btn = document.querySelectorAll(".btn");
        const resultats = document.querySelector(".resultats");
        const modal = document.getElementById("modal");
        let choix = "24h";

        all_btn.forEach(bouton => {
            bouton.addEventListener('click', () => {
                all_btn.forEach(btn => btn.classList.remove("active"));
                bouton.classList.add("active");
                choix = (bouton.id === "btn_un_jour") ? "24h" : "48h";
            });
        });

        function afficherPopup() {
            modal.classList.add("show");
        }
        function fermerPopup() {
            modal.classList.remove("show");
        }
        modal.addEventListener("click", (e) => {
            if (e.target === modal) {
                fermerPopup();
            }
        });
        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape" && modal.classList.contains("show")) {
                fermerPopup();
            }
        });

        function verifie_champ() {

            resultats.classList.remove('error');
            void resultats.offsetWidth; 

            let hd = parseInt(document.getElementById('hd').value);
            let md = parseInt(document.getElementById('md').value);
            let ha = parseInt(document.getElementById('ha').value);
            let ma = parseInt(document.getElementById('ma').value);

            let depart = document.querySelector(".depart");
            let arrivee = document.querySelector(".arrivee");
            
            if (isNaN(hd) || isNaN(md) || isNaN(ha) || isNaN(ma)) {
                resultats.innerText = "Veuillez remplir tous les champs.";
                resultats.classList.add('error');
                depart.innerText = "—";
                arrivee.innerText = "—";
                afficherPopup();
                return;
            }

            if (hd < 0 || hd > 23 || ha < 0 || ha > 23 || md < 0 || md > 59 || ma < 0 || ma > 59) {
                resultats.innerText = "Heures valides : 0 à 23. Minutes valides : 0 à 59.";
                resultats.classList.add('error');
                depart.innerText = "—";
                arrivee.innerText = "—";
                afficherPopup();
                return;
            }

            let total_minutes_depart = (hd * 60) + md;
            let total_minutes_arrivee = (ha * 60) + ma;

            if (choix === "48h") {
                total_minutes_arrivee += (24 * 60);
            }

            if (total_minutes_arrivee < total_minutes_depart) {
                resultats.innerText = "Erreur: sur 24h, l'heure de départ ne peut pas être supérieure à celle d'arrivée.";
                resultats.classList.add('error');
                depart.innerText = "—";
                arrivee.innerText = "—";
                afficherPopup();
                return;
            }

            let difference = total_minutes_arrivee - total_minutes_depart;
            let duree_h = Math.floor(difference / 60);
            let duree_m = difference % 60;

            // Afficher dans le tableau de la popup
            depart.innerText = hd +" h" + md +" min";
            arrivee.innerText = ha +" h" + ma +" min";

            // Vider les champs
            document.getElementById('hd').value = "";
            document.getElementById('md').value = "";
            document.getElementById('ha').value = "";
            document.getElementById('ma').value = "";

            // Résultat
            resultats.innerText = "La durée du vol est de " + duree_h + "h et " + duree_m + "min."
            
            // Ouvrir la popup
            afficherPopup();
        }
