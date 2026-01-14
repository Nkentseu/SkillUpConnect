
# Skill Up Connect - Architecture Backend Django (v2)

## Focus sur les Objectifs de Performance (SDG 4 & 8)

### Modèles de données clés (Django Models)
- `Profile`: Étend `User` avec `user_type` (Enum), `readiness_score` (Float), `is_formalized` (Boolean).
- `Course`: Titre, description, tags (Entrepreneurship, Digital, etc.).
- `Module`: Liaison FK vers Course, ordre.
- `Lesson`: Contenu (Vidéo URL, Markdown), durée.
- `Enrollment`: Liaison User-Course, `progress` (Percentage), `completed_at`.
- `Transaction`: Liaison User, `payment_provider` (MTN/Orange), `status`, `pack_type`.
- `FundingApplication`: Liaison User, `project_description`, `amount_requested`, `score_at_time_of_application`.

### API Endpoints Recommandés
- `POST /api/auth/register/`: Inscription avec types d'utilisateurs.
- `GET /api/dashboard/stats/`: Retourne le `readiness_score` calculé dynamiquement.
- `POST /api/payments/momo/`: Initie une requête Mobile Money.
- `GET /api/funding/eligibility/`: Vérifie si le score > 90% pour débloquer les formulaires.

### Calcul du Business Readiness Score
Le score doit être une fonction pondérée dans `models.py` :
- 50% Progression des cours.
- 25% Résultats aux quiz.
- 25% Feedback du mentor.
