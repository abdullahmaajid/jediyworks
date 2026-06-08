import { PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('Clearing existing database records to avoid duplicates...')
  await prisma.user.deleteMany({})
  await prisma.creditLink.deleteMany({})
  await prisma.collaborator.deleteMany({})
  await prisma.project.deleteMany({})

  console.log('Seeding database with 11 collaborators and 10 projects...')
  // 1. Create Collaborators (The Circle - 10 members)
  const jediy = await prisma.collaborator.create({
    data: {
      fullName: 'Jediy',
      brandingName: 'JEDIYWORKS',
      slug: 'jediyworks',
      defaultRole: 'Creative Director & Tech Architect',
      positionLine: 'Orchestrating circles and ensuring the highest standard of output.',
      photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
      bannerUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1600&q=80',
      logoUrl: 'https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?auto=format&fit=crop&w=400&q=80',
      bio: 'Curating the circle, orchestrating the execution, and ensuring every output meets the highest standard.',
      location: 'Jakarta, ID',
      personalWebsite: 'https://jediyworks.com',
      socialIg: 'jediyworks',
      socialLinkedin: 'https://linkedin.com/in/jediyworks',
      socialYoutube: 'https://youtube.com/@jediyworks',
      skills: ['Creative Direction', 'System Architecture', 'Product Strategy', 'UI/UX'],
      sortOrder: 1,
    },
  })

  const ilham = await prisma.collaborator.create({
    data: {
      fullName: 'Ilham',
      brandingName: 'HAMSSWORK',
      slug: 'hamsswork',
      defaultRole: 'Mobile Engineer',
      positionLine: 'Building fluid experiences in the palm of your hand.',
      photoUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80',
      bannerUrl: 'https://images.unsplash.com/photo-1550439062-609e1531270e?auto=format&fit=crop&w=1600&q=80',
      logoUrl: 'https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?auto=format&fit=crop&w=400&q=80',
      bio: 'Building responsive, fluid, and meticulously optimized mobile experiences for iOS and Android.',
      location: 'Bandung, ID',
      personalWebsite: 'https://github.com/hamsswork',
      socialIg: 'hamsswork_dev',
      socialLinkedin: 'https://linkedin.com/in/hamsswork',
      socialYoutube: 'https://youtube.com/@hamssworkdev',
      skills: ['Swift', 'Kotlin', 'React Native', 'Mobile UX', 'Flutter'],
      sortOrder: 2,
    },
  })

  const da = await prisma.collaborator.create({
    data: {
      fullName: 'Da',
      brandingName: 'DA COLLECTIVE',
      slug: 'da-collective',
      defaultRole: 'Web Engineer',
      positionLine: 'Building fast, structured, and performant digital infrastructure.',
      photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80',
      bannerUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1600&q=80',
      logoUrl: 'https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?auto=format&fit=crop&w=400&q=80',
      bio: 'Focused on high-performance web architecture, maximum efficiency, and modern backend integration.',
      location: 'Singapore, SG',
      personalWebsite: 'https://dacollective.dev',
      socialIg: 'dacollective',
      socialLinkedin: 'https://linkedin.com/company/dacollective',
      socialYoutube: 'https://youtube.com/@dacollective',
      skills: ['Next.js', 'Node.js', 'PostgreSQL', 'AWS', 'GraphQL'],
      sortOrder: 3,
    },
  })

  const didik = await prisma.collaborator.create({
    data: {
      fullName: 'Didik',
      brandingName: 'DIDIKKASS',
      slug: 'didikkass',
      defaultRole: 'Music & Audio',
      positionLine: 'Giving life to visuals through immersive scoring and sound design.',
      photoUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80',
      bannerUrl: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?auto=format&fit=crop&w=1600&q=80',
      logoUrl: 'https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?auto=format&fit=crop&w=400&q=80',
      bio: 'Bringing visual work to life through experimental scoring and immersive sound design.',
      location: 'Yogyakarta, ID',
      personalWebsite: 'https://soundcloud.com/didikkass',
      socialIg: 'didikkass',
      socialLinkedin: 'https://linkedin.com/in/didikkass',
      socialYoutube: 'https://youtube.com/@didikkassaudio',
      skills: ['Ableton Live', 'Sound Design', 'Film Scoring', 'Mixing'],
      sortOrder: 4,
    },
  })

  const rian = await prisma.collaborator.create({
    data: {
      fullName: 'Rian',
      brandingName: 'RIANSWORK',
      slug: 'rian-brand',
      defaultRole: 'Lead Brand Designer',
      positionLine: 'Sculpting identities that leave a permanent mark.',
      photoUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=800&q=80',
      bannerUrl: 'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?auto=format&fit=crop&w=1600&q=80',
      logoUrl: 'https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?auto=format&fit=crop&w=400&q=80',
      bio: 'Constructing iconic visual identities, precision geometric grids, and minimalist branding systems.',
      location: 'Bali, ID',
      personalWebsite: 'https://behance.net/rianswork',
      socialIg: 'rianswork',
      socialLinkedin: 'https://linkedin.com/in/rianswork',
      socialYoutube: 'https://youtube.com/@rianswork',
      skills: ['Brand Identity', 'Typography', 'Logo Design', 'Illustrator'],
      sortOrder: 5,
    },
  })

  const siti = await prisma.collaborator.create({
    data: {
      fullName: 'Siti',
      brandingName: 'SITIWRITES',
      slug: 'siti-editorial',
      defaultRole: 'Editorial Copywriter',
      positionLine: 'Crafting narratives that connect human emotions to digital craft.',
      photoUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80',
      bannerUrl: 'https://images.unsplash.com/photo-1455390582262-044cdead2708?auto=format&fit=crop&w=1600&q=80',
      logoUrl: 'https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?auto=format&fit=crop&w=400&q=80',
      bio: 'Writing editorial stories and content that bridge human emotion with digital products.',
      location: 'Yogyakarta, ID',
      personalWebsite: 'https://medium.com/@sitiwrites',
      socialIg: 'sitiwrites',
      socialLinkedin: 'https://linkedin.com/in/sitiwrites',
      socialYoutube: 'https://youtube.com/@sitiwrites',
      skills: ['Copywriting', 'Content Strategy', 'Brand Voice', 'Research'],
      sortOrder: 6,
    },
  })

  const budi = await prisma.collaborator.create({
    data: {
      fullName: 'Budi',
      brandingName: 'BUDIMOTION',
      slug: 'budi-motion',
      defaultRole: '3D & Motion Designer',
      positionLine: 'Giving motion and life to static creative realms.',
      photoUrl: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=800&q=80',
      bannerUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1600&q=80',
      logoUrl: 'https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?auto=format&fit=crop&w=400&q=80',
      bio: 'Designing motion, 3D animation, and dynamic visual transitions for web and cinematic applications.',
      location: 'Jakarta, ID',
      personalWebsite: 'https://vimeo.com/budimotion',
      socialIg: 'budimotion',
      socialLinkedin: 'https://linkedin.com/in/budimotion',
      socialYoutube: 'https://youtube.com/@budimotion',
      skills: ['Cinema4D', 'After Effects', 'Spline', 'Three.js'],
      sortOrder: 7,
    },
  })

  const dewi = await prisma.collaborator.create({
    data: {
      fullName: 'Dewi',
      brandingName: 'DEWIPHOTO',
      slug: 'dewi-photo',
      defaultRole: 'Editorial Photographer',
      positionLine: 'Capturing raw, authentic moments and editorial visual styles.',
      photoUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=800&q=80',
      bannerUrl: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1600&q=80',
      logoUrl: 'https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?auto=format&fit=crop&w=400&q=80',
      bio: 'Capturing honest, cinematic editorial moments with an uncompromising visual aesthetic.',
      location: 'Bali, ID',
      personalWebsite: 'https://dewiphoto.com',
      socialIg: 'dewiphotography',
      socialLinkedin: 'https://linkedin.com/in/dewiphoto',
      socialYoutube: 'https://youtube.com/@dewiphoto',
      skills: ['Portrait Photography', 'Lightroom', 'Editorial Styling', 'Retouching'],
      sortOrder: 8,
    },
  })

  const fikri = await prisma.collaborator.create({
    data: {
      fullName: 'Fikri',
      brandingName: 'FIKRICREATES',
      slug: 'fikri-ux',
      defaultRole: 'UI/UX & Product Designer',
      positionLine: 'Crafting sleek, functional digital pathways for user success.',
      photoUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=800&q=80',
      bannerUrl: 'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=1600&q=80',
      logoUrl: 'https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?auto=format&fit=crop&w=400&q=80',
      bio: 'Designing intuitive, user-centered digital product interfaces held to the highest standard.',
      location: 'Malang, ID',
      personalWebsite: 'https://dribbble.com/fikricreates',
      socialIg: 'fikricreates',
      socialLinkedin: 'https://linkedin.com/in/fikricreates',
      socialYoutube: 'https://youtube.com/@fikricreates',
      skills: ['Figma', 'Prototyping', 'User Research', 'Design Systems'],
      sortOrder: 9,
    },
  })

  const aulia = await prisma.collaborator.create({
    data: {
      fullName: 'Aulia',
      brandingName: 'AULIACODES',
      slug: 'aulia-front',
      defaultRole: 'Frontend Engineer',
      positionLine: 'Bridging the gap between design systems and interactive motion.',
      photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
      bannerUrl: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1600&q=80',
      logoUrl: 'https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?auto=format&fit=crop&w=400&q=80',
      bio: 'Crafting interactive frontend code, refined micro-animations, and seamless integrations.',
      location: 'Semarang, ID',
      personalWebsite: 'https://github.com/auliacodes',
      socialIg: 'auliacodes',
      socialLinkedin: 'https://linkedin.com/in/auliacodes',
      socialYoutube: 'https://youtube.com/@auliacodes',
      skills: ['React', 'Framer Motion', 'Tailwind CSS', 'WebGL'],
      sortOrder: 10,
    },
  })

  const ferry = await prisma.collaborator.create({
    data: {
      fullName: 'Ferry',
      brandingName: 'FERRYBUILDS',
      slug: 'ferrybuilds',
      defaultRole: '3D Engineer & Fabrication',
      positionLine: 'From digital models to physical reality — engineering ideas into tangible form.',
      photoUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=800&q=80',
      bannerUrl: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=1600&q=80',
      logoUrl: 'https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?auto=format&fit=crop&w=400&q=80',
      bio: 'Engineering the full pipeline from CAD 3D design through 3D printing and physical fabrication. Possesses creative sensibility and extensive event production experience — from concept to on-ground execution.',
      location: 'Yogyakarta, ID',
      personalWebsite: 'https://ferrybuilds.com',
      socialIg: 'ferrybuilds',
      socialLinkedin: 'https://linkedin.com/in/ferrybuilds',
      socialYoutube: 'https://youtube.com/@ferrybuilds',
      skills: ['CAD 3D', '3D Printing', 'Rancang Bangun', 'Creative Direction', 'Event Organizer'],
      sortOrder: 11,
    },
  })

  // 2. Create Projects (10 projects)
  
  // Project 1: Alpha Financial
  const project1 = await prisma.project.create({
    data: {
      title: 'Project Alpha',
      slug: 'sample-project-alpha',
      summary: 'A complete digital transformation for a forward-thinking fintech startup, encompassing web, mobile, and brand identity.',
      category: 'client_work',
      pillar: 'technology',
      clientName: 'Alpha Financial',
      year: 2025,
      duration: '4 Months',
      scopeOfWork: ['Web Application', 'Mobile Engineering', 'Design System', 'Backend Architecture'],
      techStack: ['Next.js', 'React Native', 'PostgreSQL', 'Tailwind CSS'],
      status: 'published',
      featured: true,
      thumbnailUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=80',
      thumbnailAlt: 'Alpha Financial Dashboard',
      problem: 'Alpha Financial needed a complete overhaul of their legacy dashboard system, which was severely lagging and difficult for their institutional clients to navigate.',
      strategy: 'Rather than patching the existing architecture, we diagnosed the root cause: the monolithic backend was unable to serve concurrent institutional sessions without throttling. Our strategic decision was to decouple the data layer entirely — introducing a dedicated API gateway and a unified cross-platform design system, ensuring that both web and mobile would share a single source of truth from day one.',
      execution: 'We formed a circle consisting of Web and Mobile engineering to build a unified design system and architecture. The web platform was rebuilt in Next.js for blazing fast delivery, while the mobile counterpart was natively engineered to provide a seamless on-the-go experience.',
      impact: 'The new ecosystem reduced load times by 70% and increased daily active users by 200%. The app became their defining competitive edge.',
      reviewAuthor: 'Jonathan Doe',
      reviewTitle: 'CEO of Alpha Financial',
      reviewQuote: 'The team did not just build what we asked for. They built what we actually needed.',
      reviewRating: 5,
      galleryImages: [
        { url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1600&q=80', alt: 'Analytics overview' },
        { url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=80', alt: 'Dashboard dark mode' },
        { url: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=1600&q=80', alt: 'Mobile app homescreen' },
        { url: 'https://images.unsplash.com/photo-1618761714954-0b8cd0026356?auto=format&fit=crop&w=1600&q=80', alt: 'Design system components' },
        { url: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=1600&q=80', alt: 'Real-time chart view' }
      ],
      credits: {
        create: [
          { collaboratorId: jediy.id, roleInProject: 'Creative Director' },
          { collaboratorId: ilham.id, roleInProject: 'Mobile Lead' },
          { collaboratorId: da.id, roleInProject: 'Web Engineer' },
        ],
      },
    },
  })

  // Project 2: Cinematic Echoes
  const project2 = await prisma.project.create({
    data: {
      title: 'Cinematic Echoes',
      slug: 'cinematic-echoes',
      summary: 'An experimental audiovisual piece exploring the relationship between stark minimalism and complex soundscapes.',
      category: 'experimental',
      pillar: 'audio_post',
      year: 2025,
      duration: '2 Weeks',
      scopeOfWork: ['Music Composition', 'Sound Design', '3D Visual Direction', 'Post-Production'],
      techStack: ['Ableton', 'Cinema 4D', 'After Effects'],
      status: 'published',
      featured: true,
      thumbnailUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1600&q=80',
      thumbnailAlt: 'Abstract 3D Visual',
      problem: 'Exploring how low-frequency oscillators can visually dictate the movement of a 3D environment in real-time.',
      strategy: 'The core hypothesis was that music and 3D geometry should not exist in separate production pipelines — they should breathe as one organism. We chose to make audio the primary driver, treating the visual layer purely as a consequence of frequency, amplitude, and time. Every parameter in Cinema 4D was mapped to a corresponding audio node, making the visual incapable of existing independently of the sound.',
      execution: 'We synchronized the master audio bus from Ableton directly into Cinema 4D parameters, creating a visual piece that literally pulses with the music.',
      galleryImages: [
        { url: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=1600&q=80', alt: 'Abstract 3D render' },
        { url: 'https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?auto=format&fit=crop&w=1600&q=80', alt: 'Audio visualization' },
        { url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1600&q=80', alt: 'Sound wave geometry' },
        { url: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=1600&q=80', alt: 'Studio session' },
        { url: 'https://images.unsplash.com/photo-1571330735066-03aaa9429d89?auto=format&fit=crop&w=1600&q=80', alt: 'Oscilloscope pattern' }
      ],
      credits: {
        create: [
          { collaboratorId: jediy.id, roleInProject: 'Visual Director' },
          { collaboratorId: didik.id, roleInProject: 'Composer & Sound Designer' },
        ],
      },
    },
  })

  // Project 3: Veloce Luxury E-Commerce
  const project3 = await prisma.project.create({
    data: {
      title: 'Veloce Luxury E-Commerce',
      slug: 'veloce-ecommerce',
      summary: 'A high-end, immersive e-commerce platform for an Italian luxury fashion house, featuring high-fidelity animations.',
      category: 'client_work',
      pillar: 'technology',
      clientName: 'Veloce Italia',
      year: 2025,
      duration: '3 Months',
      scopeOfWork: ['E-Commerce Platform', 'UI/UX Design', 'Brand Consulting', 'Copywriting'],
      techStack: ['Next.js', 'Prisma', 'Tailwind CSS', 'Stripe'],
      status: 'published',
      featured: true,
      thumbnailUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1600&q=80',
      thumbnailAlt: 'Veloce Storefront Mockup',
      problem: 'Veloce needed a web interface that mirrored the boutique tactile luxury of their physical stores, with high performance.',
      strategy: 'Luxury retail is defined by restraint. Our strategy was one of deliberate subtraction: remove every element that did not contribute to desire. We studied Veloce\'s physical flagship stores in Milan and identified three sensory signals — spatial silence, editorial lighting, and measured pace. These three principles became our design directives: whitespace as silence, photography as lighting, and animation timing as pace.',
      execution: 'We used Next.js and Tailwind CSS to craft a fast, minimal, grid-based checkout and catalog with fluid scroll transitions.',
      impact: 'Conversion rate increased by 42% in the first quarter post-launch, with page load speeds reduced to sub-500ms.',
      reviewAuthor: 'Marco Veloce',
      reviewTitle: 'Founder of Veloce Italia',
      reviewQuote: 'They captured the exact soul of our brand and translated it into code.',
      reviewRating: 5,
      galleryImages: [
        { url: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&w=1600&q=80', alt: 'Product catalog grid' },
        { url: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1600&q=80', alt: 'Checkout experience' },
        { url: 'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=1600&q=80', alt: 'Editorial fashion photography' },
        { url: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=1600&q=80', alt: 'Collection detail view' },
        { url: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1600&q=80', alt: 'Lookbook layout' }
      ],
      credits: {
        create: [
          { collaboratorId: da.id, roleInProject: 'Lead Web Engineer' },
          { collaboratorId: rian.id, roleInProject: 'Brand Designer' },
          { collaboratorId: siti.id, roleInProject: 'Copywriter' },
        ],
      },
    },
  })

  // Project 4: Oasis Wellness App
  const project4 = await prisma.project.create({
    data: {
      title: 'Oasis Wellness App',
      slug: 'oasis-wellness',
      summary: 'A premium wellness and mindfulness mobile application centered around calm aesthetics and personalized routines.',
      category: 'client_work',
      pillar: 'technology',
      clientName: 'Oasis Corp',
      year: 2024,
      duration: '6 Months',
      scopeOfWork: ['Mobile App Development', 'UI/UX Design', 'Audio Integration', 'Offline Architecture'],
      techStack: ['React Native', 'Node.js', 'MongoDB', 'Expo'],
      status: 'published',
      featured: true,
      thumbnailUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1600&q=80',
      thumbnailAlt: 'Oasis App Interface',
      problem: 'Mindfulness apps are often cluttered. Oasis wanted absolute minimalism combined with complex personalized daily suggestions.',
      strategy: 'We identified a fundamental contradiction in the wellness app market: every app that claimed to reduce stress was itself a source of cognitive overload. Our strategy was to implement a "negative space" design philosophy — where the interface recedes entirely when not needed and surfaces only when called. This demanded rethinking the entire navigation model away from tabs and into gesture-first contexts.',
      execution: 'Engineered a clean React Native mobile app with micro-interactions, dark mode, and an offline-first state architecture.',
      impact: 'Oasis reached 100k downloads in the App Store within 2 months with an average rating of 4.8 stars.',
      reviewAuthor: 'Sarah Jenkins',
      reviewTitle: 'Head of Product at Oasis',
      reviewQuote: 'The attention to detail in the transitions and audio playback is outstanding.',
      reviewRating: 5,
      galleryImages: [
        { url: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=1600&q=80', alt: 'Mindfulness player' },
        { url: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1600&q=80', alt: 'Daily routine dashboard' },
        { url: 'https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?auto=format&fit=crop&w=1600&q=80', alt: 'Sleep tracker UI' },
        { url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1600&q=80', alt: 'Ambient sound library' },
        { url: 'https://images.unsplash.com/photo-1519824145371-296894a0daa9?auto=format&fit=crop&w=1600&q=80', alt: 'Onboarding flow' }
      ],
      credits: {
        create: [
          { collaboratorId: ilham.id, roleInProject: 'Mobile Engineer' },
          { collaboratorId: didik.id, roleInProject: 'Audio Designer' },
          { collaboratorId: fikri.id, roleInProject: 'UI/UX Designer' },
        ],
      },
    },
  })

  // Project 5: Zenith Rebrand
  const project5 = await prisma.project.create({
    data: {
      title: 'Zenith Rebrand',
      slug: 'zenith-rebrand',
      summary: 'A complete corporate rebrand for a global logistics network, shifting from legacy cargo aesthetics to modern precision.',
      category: 'client_work',
      pillar: 'creative_visual',
      clientName: 'Zenith Global',
      year: 2025,
      duration: '2 Months',
      scopeOfWork: ['Brand Identity', 'Visual Systems', 'Motion Identity', 'Brand Guidelines'],
      techStack: ['Illustrator', 'Figma', 'Indesign', 'After Effects'],
      status: 'published',
      featured: true,
      thumbnailUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1600&q=80',
      thumbnailAlt: 'Zenith Branding Identity',
      problem: 'Zenith felt outdated and was losing modern tech-enabled clients. They needed a visual identity signaling reliability and speed.',
      strategy: 'Logistics brands typically compete on scale: bigger fonts, bolder maps, heavier infrastructure imagery. We chose the opposite. Our strategic position was precision over scale — a brand that communicates that Zenith\'s true differentiator is not how much they move, but how exactly they move it. This single strategic shift informed every visual decision, from the tight typographic grid to the restrained motion language.',
      execution: 'Designed a cohesive identity system based on geometric grids, variable typefaces, and a high-contrast crimson and black color palette.',
      impact: 'Successfully rolled out across 40 countries, establishing a unified brand presence and increasing corporate inquiries by 35%.',
      reviewAuthor: 'David Vance',
      reviewTitle: 'VP of Marketing, Zenith',
      reviewQuote: 'A masterclass in modern corporate identity. It redefined how we see ourselves.',
      reviewRating: 5,
      galleryImages: [
        { url: 'https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&w=1600&q=80', alt: 'Stationery design' },
        { url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1600&q=80', alt: 'Brand signage system' },
        { url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1600&q=80', alt: 'Color palette application' },
        { url: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=1600&q=80', alt: 'Typography specimen' },
        { url: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1600&q=80', alt: 'Brand vehicle wrap' }
      ],
      credits: {
        create: [
          { collaboratorId: rian.id, roleInProject: 'Lead Designer' },
          { collaboratorId: siti.id, roleInProject: 'Writer' },
          { collaboratorId: budi.id, roleInProject: 'Motion Designer' },
        ],
      },
    },
  })

  // Project 6: Chronicles Magazine
  const project6 = await prisma.project.create({
    data: {
      title: 'Chronicles Magazine',
      slug: 'chronicles-magazine',
      summary: 'A highly custom digital magazine platform featuring custom layouts, typography focal points, and smooth reading progress.',
      category: 'client_work',
      pillar: 'creative_visual',
      clientName: 'Chronicles Pub',
      year: 2024,
      duration: '3 Months',
      scopeOfWork: ['Digital Publishing Platform', 'Editorial Design', 'CMS Integration', 'Photography Direction'],
      techStack: ['Next.js', 'Sanity.io', 'Tailwind CSS', 'Framer Motion'],
      status: 'published',
      featured: false,
      thumbnailUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=1600&q=80',
      thumbnailAlt: 'Chronicles Web Layout',
      problem: 'Chronicles wanted their online publication to feel as tactile and premium as a printed Swiss magazine, not a standard blog.',
      strategy: 'Print has a quality that digital has long failed to replicate: intentionality. Every element on a printed page is placed with absolute certainty. Our strategy was to fight the infinite scroll paradigm entirely and instead architect each article as a curated visual sequence — each section transition designed as deliberately as a page turn, using scroll-linked parallax and typographic anchors to enforce reading rhythm.',
      execution: 'Developed a headless CMS integration with dynamic layout templates and scroll-linked WebGL image distortions.',
      impact: 'Time-on-site increased from an average of 1.5 minutes to 6.2 minutes, with a 50% increase in digital subscriptions.',
      reviewAuthor: 'Helena Rostova',
      reviewTitle: 'Editor-in-Chief, Chronicles',
      reviewQuote: 'They gave digital publishing the dignity of print.',
      reviewRating: 5,
      galleryImages: [
        { url: 'https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?auto=format&fit=crop&w=1600&q=80', alt: 'Feature article layout' },
        { url: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=1600&q=80', alt: 'Cover design' },
        { url: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=1600&q=80', alt: 'Editorial photography spread' },
        { url: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=1600&q=80', alt: 'Long-form reading view' },
        { url: 'https://images.unsplash.com/photo-1495020689067-958852a7765e?auto=format&fit=crop&w=1600&q=80', alt: 'CMS dashboard' }
      ],
      credits: {
        create: [
          { collaboratorId: da.id, roleInProject: 'Web Architect' },
          { collaboratorId: siti.id, roleInProject: 'Copy Editor' },
          { collaboratorId: dewi.id, roleInProject: 'Lead Photographer' },
        ],
      },
    },
  })

  // Project 7: Elysian Soundscape
  const project7 = await prisma.project.create({
    data: {
      title: 'Elysian Soundscape',
      slug: 'elysian-soundscape',
      summary: 'An immersive spatial audio landscape created for a multi-channel gallery installation, focusing on nature and industrial contrast.',
      category: 'experimental',
      pillar: 'audio_post',
      clientName: 'Art Council Jogja',
      year: 2025,
      duration: '1 Month',
      scopeOfWork: ['Spatial Audio Design', 'Field Recording', 'Dolby Atmos Mixing', 'Installation Sound'],
      techStack: ['Pro Tools', 'Dolby Atmos', 'MaxMSP'],
      status: 'published',
      featured: false,
      thumbnailUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1600&q=80',
      thumbnailAlt: 'Spatial Audio Setup',
      problem: 'Standard stereo fields couldn\'t capture the claustrophobic transition from natural forests to heavy machinery.',
      strategy: 'Sound is the only sense that surrounds you completely. Our strategic approach was to treat the gallery space not as a room with speakers in it, but as a single resonant instrument. We mapped the acoustic properties of the physical space before writing a single note, and used those natural resonances as compositional constraints. The result was not sound placed in a room — it was sound grown from a room.',
      execution: 'Engineered a 12-channel Dolby Atmos soundscape using customized spatial algorithms and field recordings.',
      impact: 'Featured in three international design biennials, praised for its sensory depth and emotional resonance.',
      reviewAuthor: 'Hartono',
      reviewTitle: 'Exhibition Curator',
      reviewQuote: 'An overwhelming auditory experience that physically alters the room\'s energy.',
      reviewRating: 5,
      galleryImages: [
        { url: 'https://images.unsplash.com/photo-1516280440614-37939bbacd6a?auto=format&fit=crop&w=1600&q=80', alt: 'Studio recording session' },
        { url: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1600&q=80', alt: 'Speaker array installation' },
        { url: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1600&q=80', alt: 'Mixing console detail' },
        { url: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=1600&q=80', alt: 'Field recording in forest' },
        { url: 'https://images.unsplash.com/photo-1571330735066-03aaa9429d89?auto=format&fit=crop&w=1600&q=80', alt: 'Gallery installation view' }
      ],
      credits: {
        create: [
          { collaboratorId: didik.id, roleInProject: 'Composer' },
          { collaboratorId: budi.id, roleInProject: '3D Modeler' },
        ],
      },
    },
  })

  // Project 8: Nexus Smart Home
  const project8 = await prisma.project.create({
    data: {
      title: 'Nexus Smart Home',
      slug: 'nexus-smarthome',
      summary: 'An ultra-low latency dashboard interface for control and visualization of connected home systems and energy telemetry.',
      category: 'client_work',
      pillar: 'technology',
      clientName: 'Nexus Home Inc',
      year: 2025,
      duration: '5 Months',
      scopeOfWork: ['Dashboard UI/UX', 'Real-Time Systems', 'IoT Integration', 'Hardware-Software Bridge'],
      techStack: ['React', 'WebSockets', 'Tailwind CSS', 'Rust'],
      status: 'published',
      featured: false,
      thumbnailUrl: 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=1600&q=80',
      thumbnailAlt: 'Nexus Home Dashboard',
      problem: 'Existing interfaces suffered from 2-3 second command lag and confusing sub-menus for simple actions.',
      strategy: 'The core insight was that the UI was being blamed for a problem that lived in the infrastructure. User research revealed that the 2-3 second lag was not a rendering issue — it was a round-trip latency issue caused by polling REST APIs on a 1-second interval. Our strategic decision was to eliminate the polling model entirely and replace it with a persistent bidirectional socket layer backed by a bare-metal Rust daemon, making the interface merely a renderer, not a data orchestrator.',
      execution: 'Built a reactive system utilizing persistent WebSockets connection linked to a lightweight Rust daemon.',
      impact: 'Command latency dropped below 30ms globally. Energy visualization helped users reduce consumption by 15%.',
      reviewAuthor: 'Arthur Pendelton',
      reviewTitle: 'CTO of Nexus Home',
      reviewQuote: 'The speed and responsiveness of this dashboard is unparalleled.',
      reviewRating: 5,
      galleryImages: [
        { url: 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=1600&q=80', alt: 'Home dashboard overview' },
        { url: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?auto=format&fit=crop&w=1600&q=80', alt: 'Smart home control panel' },
        { url: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&w=1600&q=80', alt: 'Energy telemetry graphs' },
        { url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=80', alt: 'System architecture diagram' },
        { url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1600&q=80', alt: 'Real-time latency monitor' }
      ],
      credits: {
        create: [
          { collaboratorId: jediy.id, roleInProject: 'Lead Architect' },
          { collaboratorId: da.id, roleInProject: 'System Integrator' },
          { collaboratorId: aulia.id, roleInProject: 'Frontend Dev' },
        ],
      },
    },
  })

  // Project 9: Kinetica Exhibition
  const project9 = await prisma.project.create({
    data: {
      title: 'Kinetica Exhibition',
      slug: 'kinetica-exhibition',
      summary: 'An interactive public installation where human movement transforms generative 3D particles on a massive LED wall.',
      category: 'experimental',
      pillar: 'creative_visual',
      clientName: 'Kinetica Collective',
      year: 2024,
      duration: '3 Weeks',
      scopeOfWork: ['Creative Technology', 'Generative Art', 'WebGL Engineering', 'Motion Capture Integration'],
      techStack: ['Three.js', 'WebGL', 'Kinect SDK', 'GLSL'],
      status: 'published',
      featured: false,
      thumbnailUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1600&q=80',
      thumbnailAlt: 'Kinetica Interactive Screen',
      problem: 'Creating responsive interactive particle systems containing 1 million elements at 60fps on web browsers.',
      strategy: 'Most interactive installations are reactive: press a button, get a response. We wanted something more intimate — an installation that felt like a conversation, not a vending machine. Our strategy was to encode human presence rather than human gesture: tracking not just movement, but speed, stillness, and proximity as separate signals. A person standing perfectly still would produce an entirely different visual state than a person in motion, making the piece uniquely responsive to personality.',
      execution: 'Programmed custom GPU fragment shaders combined with WebGL buffer geometry and motion tracking input.',
      impact: 'Visited by over 20,000 people during a 2-week public art showcase, generating high social media engagement.',
      reviewAuthor: 'Elena Rostova',
      reviewTitle: 'Director of Kinetica',
      reviewQuote: 'Pure magic. The interaction is instantaneous and the visuals are incredibly crisp.',
      reviewRating: 5,
      galleryImages: [
        { url: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1600&q=80', alt: 'Shader code & particle system' },
        { url: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1600&q=80', alt: 'LED wall full view' },
        { url: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1600&q=80', alt: 'Audience interaction' },
        { url: 'https://images.unsplash.com/photo-1616400619175-5beda3a17896?auto=format&fit=crop&w=1600&q=80', alt: 'Particle trail close-up' },
        { url: 'https://images.unsplash.com/photo-1478145046317-39f10e56b5e9?auto=format&fit=crop&w=1600&q=80', alt: 'Installation night view' }
      ],
      credits: {
        create: [
          { collaboratorId: jediy.id, roleInProject: 'Tech Lead' },
          { collaboratorId: budi.id, roleInProject: 'Motion Designer' },
          { collaboratorId: aulia.id, roleInProject: 'Creative Coder' },
        ],
      },
    },
  })

  // Project 10: Aura Skincare Portal
  const project10 = await prisma.project.create({
    data: {
      title: 'Aura Skincare Portal',
      slug: 'aura-skincare',
      summary: 'A premium direct-to-consumer web experience featuring interactive 3D product renders and custom ingredient builder.',
      category: 'client_work',
      pillar: 'technology',
      clientName: 'Aura Labs',
      year: 2025,
      duration: '3 Months',
      scopeOfWork: ['3D Web Experience', 'Product Visualization', 'UI/UX Design', 'E-Commerce Integration'],
      techStack: ['Next.js', 'Three.js', 'React Three Fiber', 'Tailwind CSS'],
      status: 'published',
      featured: false,
      thumbnailUrl: 'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=1600&q=80',
      thumbnailAlt: 'Aura 3D Product Interactive',
      problem: 'Standard skincare portals feel static. Aura wanted users to rotate and inspect the bottles and explore ingredients in 3D.',
      strategy: 'In skincare, trust is tactile. Consumers buy skincare products in physical stores because they can hold the bottle, feel the weight, read the label at their own pace. Online, that tactility disappears entirely — replaced by flat photography. Our strategy was to restore the physical inspection experience in digital form: a fully rotatable, zoomable 3D model of each product, where every surface detail is rendered at the same fidelity as the physical object.',
      execution: 'Developed an optimized 3D showcase using React Three Fiber with gLTF compression and custom physics shaders.',
      impact: 'Session duration increased by 85%, and product detail page CTR increased by 31% within 30 days.',
      reviewAuthor: 'Chloe Vance',
      reviewTitle: 'Founder of Aura Labs',
      reviewQuote: 'The 3D execution exceeded all our expectations. It is a stunning digital storefront.',
      reviewRating: 5,
      galleryImages: [
        { url: 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&w=1600&q=80', alt: 'Ingredient builder UI' },
        { url: 'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=1600&q=80', alt: '3D product interactive hero' },
        { url: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=1600&q=80', alt: 'Bottle detail 360 view' },
        { url: 'https://images.unsplash.com/photo-1570194065650-d99fb4b38d29?auto=format&fit=crop&w=1600&q=80', alt: 'Skincare product flatlay' },
        { url: 'https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&w=1600&q=80', alt: 'Checkout & upsell flow' }
      ],
      credits: {
        create: [
          { collaboratorId: da.id, roleInProject: 'Web Engineer' },
          { collaboratorId: fikri.id, roleInProject: 'Product Designer' },
          { collaboratorId: aulia.id, roleInProject: '3D Dev' },
        ],
      },
    },
  })

  // ─────────────────────────────────────────────
  // 3. Create Users
  // ─────────────────────────────────────────────
  console.log('Seeding authentication users...')
  const hashedAdminPassword = await bcrypt.hash('admin123', 10)
  const hashedCollabPassword = await bcrypt.hash('collab123', 10)

  // System Admin
  await prisma.user.create({
    data: {
      username: 'admin',
      password: hashedAdminPassword,
      role: 'admin',
    },
  })

  // Jediy User (Collaborator)
  await prisma.user.create({
    data: {
      username: 'jediyworks',
      password: hashedCollabPassword,
      role: 'collaborator',
      collaboratorId: jediy.id,
    },
  })

  // Ferry User (Collaborator)
  await prisma.user.create({
    data: {
      username: 'ferrybuilds',
      password: hashedCollabPassword,
      role: 'collaborator',
      collaboratorId: ferry.id,
    },
  })

  console.log('Database seeded successfully with 11 collaborators, 10 projects, and 3 users!')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
