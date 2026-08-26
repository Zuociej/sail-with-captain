# Sail Away

Create a modern, responsive landing page (One-Page website) with a separate secure Admin Panel accessible via the `/admin` route. The site is for a female yacht Captain who organizes exclusive all-female sailing trips ("Babskie rejsy"). The vibe should resonate with sea adventures, freedom, and professional sailing, inspired by the brand "Pożegluj sobie ze mną" (Sail with me).

### STYLING & DESIGN GUIDELINES:

- **Aesthetic**: Modern, minimalist, elegant, with a nautical yet premium and feminine touch.

- **Color Palette**: Deep navy blue, crisp white, with warm sand or subtle gold accents. Clean light background with dark accents, or a high-quality dark mode aesthetic.

- **UI/UX**: Use Shadcn UI components and Lucide icons (e.g., Ship, Anchor, Waves, Calendar, User, Phone, Mail). Ensure smooth scrolling navigation between sections.

### MAIN LANDING PAGE SECTIONS (One-Page):

1. **Navbar**: Fixed header with a logo placeholder "Pożegluj sobie ze mną" and nav links to: Who I Am, What I Do, Sailing Trips, Contact. Include a small, discrete "Login" button at the far right leading to the `/admin` page.

2. **Hero Section**: Full-screen or large impactful nautical background banner. Large elegant typography heading (e.g., "Catch the Wind with the Captain"), a short sub-headline inviting women to join the cruises, and a prominent CTA button "Explore Trips" that smooth-scrolls to the trips section.

3. **"Who I Am" Section (Kim jestem)**: Split layout with a high-quality portrait photo placeholder on one side and a compelling biography text on the other.

4. **"What I Do" Section (Co robię)**:

   - **Sub-section A**: "Sailing Rules & Conditions" (Warunki pływania z Kapitanką) displayed using clean feature cards or an accordion. It should detail what to expect, safety, and checklist rules.

   - **Sub-section B**: "Life on Board" (Co słychać na pokładzie?) – an elegant UI card placeholder imitating a real-time Facebook Feed from the "Pożegluj sobie ze mną" page, complete with a "Follow on Facebook" button.

5. **"Sailing Trips" Section (Babskie rejsy)**: A modern responsive grid of cruise cards. Each trip card must display:

   - Destination photo placeholder.

   - Destination title (e.g., "Sunny Greece", "Magical Croatia").

   - Dates & Duration (e.g., "12.07 - 19.07.2026, 7 days").

   - Price (e.g., "3200 PLN").

   - Spots left counter badge (e.g., "3 spots left" or "Last spot!"). If available spots reach 0, the button should turn disabled and display "Sold Out".

   - "Join Cruise" (Dołącz) Button: Clicking this opens a Modal pop-up with a registration form (Name, Email, Phone, Message). The form must automatically pre-fill or pass the selected cruise name. Submitting the form should trigger a beautiful success Toast notification.

6. **"Contact" Section**: Clean contact form, direct email, phone number layout, and social media icon links.

### ADMINISTRATIVE PANEL (`/admin`):

- Create a clean, centered Login Form at the `/admin` path. For prototype purposes, mock the credentials as: Login: `admin` / Password: `admin123`.

- After successful login, redirect to a clean Admin Dashboard.

- The Admin Panel must allow the Captain to:

  1. **Edit Texts**: Edit the text content of the "Who I Am", "Sailing Rules", and "Contact" sections via simple textarea inputs.

  2. **Manage Cruises**: Display the list of cruises in an editable table or list view. Allow the Captain to edit the price, dates, and change the number of available spots dynamically using incremental plus/minus buttons.

- Clicking a "Save Changes" button in the admin view must immediately update the global state (use React State, Context, or Zustand to simulate a live database for now) so that returning to the main landing page shows the updated data.

- Include a "Logout" button.

Structure the code cleanly, separating concerns into individual components (e.g., `Hero.tsx`, `TripCard.tsx`, `AdminDashboard.tsx`) so it is easy to export, open in Visual Studio Code (VSC), and connect to Hostido or Supabase later.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

## Hostido deployment

Build the static site locally with `npm run build`, then upload everything inside
`dist` to the domain's public directory on Hostido. The included `dist/.htaccess`
keeps the `/admin` client route working after a browser refresh.

The current frontend keeps editable content in browser `localStorage`. A PHP API
must be added and configured on Hostido before the MySQL database is used in
production; database credentials must remain on the server and never be placed
in React or a public JavaScript file.

### Hostido API setup

The build includes a starter API in `dist/api`. In Hostido's File Manager:

1. Copy `api/config.php.example` to `api/config.php`.
2. Enter the Hostido MySQL credentials in `api/config.php`.
3. Import the database schema through phpMyAdmin.
4. Run `database/security.sql` in phpMyAdmin to add login rate limiting.
5. Generate an admin password hash on a private machine:

   ```sh
   php -r "echo password_hash('REPLACE_WITH_A_NEW_PASSWORD', PASSWORD_DEFAULT), PHP_EOL;"
   ```

6. Insert the generated hash into `admin_users.password_hash`; never store the
   plain password in SQL or JavaScript.
7. Test `https://your-domain.example/api/health.php` and expect `{"ok":true}`.

Available endpoints:

- `GET /api/health.php` checks the database connection.
- `GET /api/trips.php` returns active trips.
- `POST /api/applications.php` saves a trip application and reserves a spot.
- `POST /api/login.php` starts a secure PHP admin session.
- `GET /api/me.php` verifies the current admin session.
- `POST /api/logout.php` destroys the current admin session.
- `GET /api/admin-trips.php` is protected and requires an admin session.

Never commit or upload `config.php.example` as the live configuration. The real
`config.php` is ignored by Git and must stay server-side.
