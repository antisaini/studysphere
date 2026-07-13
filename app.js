import { db, auth } from "./firebase-config.js";
import {
    getCollection,
    setDocument,
    addDocument,
    updateDocument,
    deleteDocument
} from "./firestore-service.js";

console.log("Firebase Connected");
console.log(db);
console.log(auth);

// --- APPLICATION MOCK DATABASE ---
const DEFAULT_SUBJECTS = [
  { code: 'CS-201', name: 'Data Structures and Algorithms', semester: '3', department: 'CS', notesCount: 12, pyqCount: 8 },
  { code: 'CS-202', name: 'Discrete Mathematics', semester: '3', department: 'CS', notesCount: 8, pyqCount: 5 },
  { code: 'CS-203', name: 'Computer Organization & Architecture', semester: '3', department: 'CS', notesCount: 9, pyqCount: 6 },
  { code: 'CS-204', name: 'Object Oriented Programming', semester: '3', department: 'CS', notesCount: 15, pyqCount: 4 },
  { code: 'CS-301', name: 'Operating Systems', semester: '4', department: 'CS', notesCount: 14, pyqCount: 9 },
  { code: 'CS-302', name: 'Database Management Systems', semester: '4', department: 'CS', notesCount: 11, pyqCount: 7 },
  { code: 'CS-303', name: 'Theory of Computation', semester: '4', department: 'CS', notesCount: 7, pyqCount: 4 },
  { code: 'CS-304', name: 'Computer Networks', semester: '4', department: 'CS', notesCount: 10, pyqCount: 6 },
  { code: 'EE-101', name: 'Basic Electrical Engineering', semester: '1', department: 'EE', notesCount: 6, pyqCount: 4 },
  { code: 'PH-101', name: 'Engineering Physics', semester: '1', department: 'AS', notesCount: 15, pyqCount: 8 },
  { code: 'CY-101', name: 'Engineering Chemistry', semester: '1', department: 'AS', notesCount: 10, pyqCount: 5 },
  { code: 'MA-101', name: 'Engineering Mathematics - I', semester: '1', department: 'AS', notesCount: 12, pyqCount: 10 },
  { code: 'MA-201', name: 'Engineering Mathematics - III', semester: '3', department: 'AS', notesCount: 8, pyqCount: 6 },
  { code: 'ME-201', name: 'Thermodynamics', semester: '3', department: 'ME', notesCount: 10, pyqCount: 7 },
  { code: 'ME-202', name: 'Fluid Mechanics', semester: '3', department: 'ME', notesCount: 9, pyqCount: 5 },
  { code: 'CE-201', name: 'Strength of Materials', semester: '3', department: 'CE', notesCount: 11, pyqCount: 6 }
];

const DEFAULT_MATERIALS = [
  {
    id: 'mat-1',
    title: 'Data Structures End-Sem Question Paper (2024)',
    subjectCode: 'CS-201',
    category: 'pyq',
    year: '2024',
    examType: 'End-Sem',
    author: 'Admin',
    semester: '3',
    downloads: 142,
    bookmarked: false,
    tags: ['dsa', 'end-sem', '2024', 'arrays', 'trees', 'graphs'],
    description: 'Final semester exam paper covering linear lists, trees, heap sorting, search trees, and Dijkstra\'s shortest path algorithm. Highly recommended.',
    sheetContent: {
      header: 'END-SEMESTER EXAMINATION, MAY 2024',
      subject: 'DATA STRUCTURES & ALGORITHMS (CS-201)',
      duration: '3 Hours',
      maxMarks: '100 Marks',
      questions: [
        {
          num: '1.',
          text: 'Answer the following short questions: (5 x 4 = 20 Marks)',
          sub: [
            'Differentiate between stable and unstable sorting algorithms with examples.',
            'Explain the concept of balance factor in AVL trees.',
            'What is a Hash Collision? How does quadratic probing resolve it?',
            'Explain the space complexity of Depth First Search (DFS).'
          ]
        },
        {
          num: '2.',
          text: 'Construct an AVL tree by inserting the following sequence of keys one by one: 50, 25, 10, 5, 7, 30, 20, 8. Clearly show all rotations (single or double) performed during insertion. (15 Marks)'
        },
        {
          num: '3.',
          text: 'Write an algorithm to detect a cycle in a Directed Graph using Depth First Search (DFS). Explain the time complexity of your approach. (15 Marks)'
        },
        {
          num: '4.',
          text: 'Find the Minimum Spanning Tree (MST) of the given weighted graph using Prim\'s Algorithm. List the order in which edges are added to the tree. (15 Marks)'
        },
        {
          num: '5.',
          text: 'Define B-Trees. Create a B-Tree of order 3 by inserting the keys: 10, 20, 5, 8, 15, 30, 25 in order. (15 Marks)'
        },
        {
          num: '6.',
          text: 'Write a C++ class implementation of a Threaded Binary Tree, including the structure of a node and the algorithm for inorder traversal. (20 Marks)'
        }
      ]
    }
  },
  {
    id: 'mat-2',
    title: 'Operating Systems Mid-Sem Paper (2024)',
    subjectCode: 'CS-301',
    category: 'pyq',
    year: '2024',
    examType: 'Mid-Sem',
    author: 'Admin',
    semester: '4',
    downloads: 87,
    bookmarked: false,
    tags: ['operating-systems', 'midsem', '2024', 'scheduling', 'semaphores'],
    description: 'Mid-semester question paper containing CPU scheduling arithmetic, semaphore race conditions, and system calls.',
    sheetContent: {
      header: 'MID-SEMESTER EXAMINATION, MARCH 2024',
      subject: 'OPERATING SYSTEMS (CS-301)',
      duration: '1.5 Hours',
      maxMarks: '50 Marks',
      questions: [
        {
          num: '1.',
          text: 'Explain the difference between User Mode and Kernel Mode. What triggers the transition between these modes? (10 Marks)'
        },
        {
          num: '2.',
          text: 'Consider five processes P1, P2, P3, P4, P5 arriving at time 0 with burst times 10, 4, 2, 7, 3 ms. Calculate average waiting time and turnaround time using Shortest Job First (SJF) and Round Robin (Quantum = 2ms). (15 Marks)'
        },
        {
          num: '3.',
          text: 'Explain the critical section problem. Write a software solution using Dekker\'s algorithm for two processes and prove how it satisfies mutual exclusion. (15 Marks)'
        },
        {
          num: '4.',
          text: 'Write short notes on: (5 x 2 = 10 Marks)',
          sub: [
            'System calls vs. Standard Library functions',
            'Context switching overhead and registers saved'
          ]
        }
      ]
    }
  },
  {
    id: 'mat-3',
    title: 'Complete Lecture Notes on Graph Algorithms',
    subjectCode: 'CS-201',
    category: 'notes',
    year: '2025',
    examType: 'N/A',
    author: 'Prof. Sharma',
    semester: '3',
    downloads: 310,
    bookmarked: false,
    tags: ['dsa', 'graph', 'notes', 'bfs', 'dfs', 'kruskal'],
    description: 'Detailed, handwritten-style digital notes explaining BFS, DFS, Kruskal\'s, Prim\'s, and Bellman-Ford algorithms with pseudocode and solved trace diagrams.',
    sheetContent: {
      header: 'STUDY NOTES: CHAPTER 6 - GRAPH ALGORITHMS',
      subject: 'DATA STRUCTURES & ALGORITHMS (CS-201)',
      duration: 'Prof. Sharma Lecture Series',
      maxMarks: 'Self Study Guide',
      questions: [
        {
          num: '1. Introduction to Graphs',
          text: 'A Graph G is represented as G = (V, E), where V is the set of vertices (nodes) and E is the set of edges connecting those vertices. Graphs can be Directed, Undirected, Weighted, or Unweighted.'
        },
        {
          num: '2. Breadth-First Search (BFS)',
          text: 'BFS explores the graph level-by-level starting from a source node. It uses a FIFO Queue structure. Time Complexity: O(V + E). Space Complexity: O(V).',
          sub: [
            'Initialize all vertices to WHITE (unvisited).',
            'Enqueue the source vertex and mark it GREY (visiting).',
            'While queue is not empty, dequeue u, visit all unvisited neighbors, enqueue them, then mark u BLACK (done).'
          ]
        },
        {
          num: '3. Depth-First Search (DFS)',
          text: 'DFS searches deep into a branch before backtracking. It uses a LIFO Stack structure (or system call recursion). It assigns Discovery (d) and Finishing (f) timestamps to vertices. Time Complexity: O(V + E).'
        },
        {
          num: '4. Shortest Paths: Dijkstra\'s vs. Bellman-Ford',
          text: 'Dijkstra\'s is a greedy algorithm that finds the single-source shortest path for non-negative weights in O((V + E) log V). Bellman-Ford is a dynamic programming approach that accommodates negative edge weights and detects negative weight cycles in O(V * E).'
        }
      ]
    }
  },
  {
    id: 'mat-4',
    title: 'Discrete Mathematics Textbook Solutions',
    subjectCode: 'CS-202',
    category: 'book',
    year: '2023',
    examType: 'N/A',
    author: 'Senior Guild',
    semester: '3',
    downloads: 201,
    bookmarked: false,
    tags: ['math', 'discrete', 'textbook', 'relations', 'induction'],
    description: 'Reference book solution manual for relations, functions, mathematical induction, and group theory. Helpful for assignments.',
    sheetContent: {
      header: 'CHAPTER 4 SELECT SOLUTIONS: MATHEMATICAL INDUCTION',
      subject: 'DISCRETE MATHEMATICS (CS-202)',
      duration: 'Student Contributed Manual',
      maxMarks: 'Reference material',
      questions: [
        {
          num: 'Problem 4.1',
          text: 'Prove using mathematical induction that 1 + 2 + 3 + ... + n = n(n+1)/2 for all positive integers n.'
        },
        {
          num: 'Proof Step 1 (Basis):',
          text: 'For n = 1: Left Side = 1. Right Side = 1(1+1)/2 = 1. The basis step is true.'
        },
        {
          num: 'Proof Step 2 (Inductive Hypothesis):',
          text: 'Assume the statement is true for some positive integer k, i.e., 1 + 2 + ... + k = k(k+1)/2.'
        },
        {
          num: 'Proof Step 3 (Inductive Step):',
          text: 'Show it is true for k + 1. We must prove 1 + 2 + ... + k + (k+1) = (k+1)(k+2)/2.',
          sub: [
            'Using the hypothesis, substitute Left Side: [k(k+1)/2] + (k+1)',
            'Factor out (k+1): (k+1) * [k/2 + 1]',
            'Simplify terms: (k+1) * [(k+2)/2] = (k+1)(k+2)/2',
            'Thus, the statement is proved by induction.'
          ]
        }
      ]
    }
  },
  {
    id: 'mat-5',
    title: 'Introduction to Electrostatics & Optics',
    subjectCode: 'PH-101',
    category: 'notes',
    year: '2025',
    examType: 'N/A',
    author: 'Physics Dept',
    semester: '1',
    downloads: 167,
    bookmarked: false,
    tags: ['physics', 'optics', 'laser', 'interference', 'sem-1'],
    description: 'Comprehensive review notes covering interference of light, diffraction, Maxwell equations, and laser optics principles.',
    sheetContent: {
      header: 'ENGINEERING PHYSICS NOTES: LIGHT INTERFERENCE',
      subject: 'ENGINEERING PHYSICS (PH-101)',
      duration: 'Physics Lecture Hall A',
      maxMarks: 'Syllabus notes',
      questions: [
        {
          num: '1. Superposition Principle',
          text: 'When two or more light waves overlap, the resultant displacement at any point is the vector sum of individual wave displacements. This leads to constructive and destructive interference patterns.'
        },
        {
          num: '2. Young\'s Double Slit Experiment',
          text: 'Calculates fringe width (beta) as beta = (lambda * D) / d, where lambda is wavelength, D is distance to screen, and d is distance between slits.'
        },
        {
          num: '3. Lasers and Coherence',
          text: 'Laser light is monochromatic, coherent, and highly directional. The main components are: Active medium, Pumping source, and Optical Resonator. Population Inversion is a necessary prerequisite.'
        }
      ]
    }
  },
  {
    id: 'mat-6',
    title: 'Basic Electrical Engineering End-Sem (2023)',
    subjectCode: 'EE-101',
    category: 'pyq',
    year: '2023',
    examType: 'End-Sem',
    author: 'Admin',
    semester: '1',
    downloads: 110,
    bookmarked: false,
    tags: ['electrical', 'circuits', 'end-sem', 'sem-1'],
    description: 'End-sem paper covering DC circuit theorems (Thevenin, Norton, Superposition), AC fundamentals, and single-phase transformers.',
    sheetContent: {
      header: 'END-SEMESTER EXAMINATION, DECEMBER 2023',
      subject: 'BASIC ELECTRICAL ENGINEERING (EE-101)',
      duration: '3 Hours',
      maxMarks: '100 Marks',
      questions: [
        {
          num: '1.',
          text: 'Using Thevenin\'s Theorem, find the current flowing through a 10 ohm load resistor connected in a complex DC mesh. (20 Marks)'
        },
        {
          num: '2.',
          text: 'Define RMS value, Average value, and Form Factor of an alternating sinusoidal current. Derive their mathematical formulas. (20 Marks)'
        },
        {
          num: '3.',
          text: 'Explain the working principle and construction details of a single-phase transformer. Draw its equivalent circuit diagram. (20 Marks)'
        },
        {
          num: '4.',
          text: 'State Superposition Theorem. Explain its applicability limits in non-linear networks. (20 Marks)'
        }
      ]
    }
  }
];

const DEFAULT_NOTIFICATIONS = [
  { id: 'notif-1', text: 'New Notes added in "Operating Systems (CS-301)" by Admin.', time: '2 hours ago', type: 'system', unread: true },
  { id: 'notif-2', text: 'Congratulations! Your contributed PDF "Discrete Math Solutions" was downloaded 50 times.', time: '1 day ago', type: 'reward', unread: true },
  { id: 'notif-3', text: 'Welcome to StudySphere! Pin documents to access them quickly.', time: '2 days ago', type: 'welcome', unread: false }
];

const DEFAULT_SUGGESTIONS = [
  { id: 'sug-1', subject: 'Incomplete notes for Discrete Math relations', category: 'Material Request', urgency: 'Medium', desc: 'Chapter 3 notes seem to cut off right before relations and graph properties. Can anyone upload the complete set?', status: 'Added to Queue', date: '2 days ago', approved: true, likes: 14 },
  { id: 'sug-2', subject: 'PDF view zoom controls are laggy', category: 'Bug Report', urgency: 'Low', desc: 'When zooming in/out on chrome browser mobile, the text stays blurry for a second before snapping to scale.', status: 'Reviewing', date: '3 days ago', approved: false, likes: 3 }
];

const DEFAULT_HELP_REQUESTS = [
  { 
    id: 'help-1', 
    title: 'Having difficulty connecting with peers', 
    category: 'Loneliness / Isolation', 
    desc: 'I joined college late and find it very hard to fit into existing groups. Feel lonely during lunch breaks.', 
    instagram: 'rahul_sen12', 
    approved: true, 
    date: 'Yesterday', 
    author: 'Anonymous Student',
    chatHistory: [
      { sender: 'visitor', text: 'Hey, I really find it hard to talk to classmates. Everyone already has groups.', time: 'Yesterday' },
      { sender: 'admin', text: 'Hi Rahul! Thank you for sharing. It is completely normal to feel this way. Let\'s chat here, or I can ping you on Instagram. Would you like to join the College Orientation volunteer club next week?', time: 'Yesterday' }
    ]
  },
  { 
    id: 'help-2', 
    title: 'Anxious about end-sem result dates', 
    category: 'Anxiety / Stress', 
    desc: 'Extremely stressed about DSA papers. Constantly thinking about failing and family pressure.', 
    instagram: 'priya.kaushik', 
    approved: true, 
    date: '3 days ago', 
    author: 'Anonymous Student',
    chatHistory: [
      { sender: 'visitor', text: 'I feel like I will fail CS-201 and disappoint my family.', time: '3 days ago' },
      { sender: 'admin', text: 'Please take a deep breath. A single paper does not define your worth. The computer science department holds remedial classes; we can guide you to tutor hours.', time: '2 days ago' }
    ]
  }
];

// --- CORE APPLICATION CONTROLLER STATE ---
const DEFAULT_EXPERIENCES = [
  {
    id: 'exp-1',
    title: 'Cracking Google India SWE Interview Rounds',
    name: 'Rohit Sharma (Senior CS)',
    company: 'Google India',
    desc: 'Prepared mainly through Leetcode (200 medium, 50 hard). Focused heavily on Trees, Graphs, and Dynamic Programming. System Design was basic - read about load balancers and database scaling. The recruiter was very friendly, and clean code with clear variable names was appreciated.',
    contact: 'linkedin.com/in/rohit-sharma-cs',
    approved: true,
    date: '3 days ago'
  },
  {
    id: 'exp-2',
    title: 'Cognizant Placement Walkthrough & DBMS Tips',
    name: 'Anjali Verma (Senior ECE)',
    company: 'Cognizant',
    desc: 'The process had 3 rounds: Online Test (Aptitude + Basic coding in Java), Technical Interview (focused on DBMS queries, OOPs, and project architecture), and HR Interview. Project depth is crucial - they asked me to explain the exact schemas used in my database.',
    contact: 'instagram.com/anjali_ece',
    approved: true,
    date: '5 days ago'
  }
];

// --- CORE APPLICATION CONTROLLER STATE ---
let subjects = [];
let materials = [];
let notifications = [];
let suggestions = [];
let helpRequests = [];
let seniorExperiences = [];
let isAdminLoggedIn = false;
let sessionLikedSuggestions = [];
let selectedAdminTicketId = null;
let currentView = 'dashboard';
let navigationHistory = [];

let activeFilters = {
  explorerSem: '3',
  explorerDept: 'CS',
  explorerType: 'all',
  pyqYear: 'all',
  pyqExam: 'all',
  pyqSubject: 'all'
};
let selectedSubject = null;
let currentZoom = 100;
let personalNotes = {}; // Structure: { materialId: "notes content text" }

// --- DOM ELEMENT REFERENCES ---
const viewElements = {};
const navLinks = document.querySelectorAll('.nav-link');
const pageTitle = document.getElementById('page-title');
const headerBackBtn = document.getElementById('header-back-btn');
const globalSearch = document.getElementById('global-search');
const searchSuggestions = document.getElementById('search-suggestions');
const notificationBtn = document.getElementById('notification-btn');
const notificationDropdown = document.getElementById('notification-dropdown');
const toastContainer = document.getElementById('toast-container');
const menuToggle = document.getElementById('menu-toggle');
const sidebar = document.querySelector('.sidebar');

// Theme Toggle
const themeToggleBtn = document.getElementById('theme-toggle-btn');
const themeIconDark = document.getElementById('theme-icon-dark');
const themeIconLight = document.getElementById('theme-icon-light');

// Finder Panel Elements
const finderForm = document.getElementById('finder-form');
const finderCourseSelect = document.getElementById('finder-course-select');
const finderCourseManual = document.getElementById('finder-course-manual');
const finderYearSelect = document.getElementById('finder-year-select');
const finderYearManual = document.getElementById('finder-year-manual');
const finderSemSelect = document.getElementById('finder-sem-select');
const finderSubjectSelect = document.getElementById('finder-subject-select');
const finderSubjectManual = document.getElementById('finder-subject-manual');
const finderBook = document.getElementById('finder-book');
const finderClearBtn = document.getElementById('finder-clear-btn');
const finderResultsSection = document.getElementById('finder-results-section');
const finderResultsGrid = document.getElementById('finder-results-grid');
const closeResultsBtn = document.getElementById('close-results-btn');
const resultsTitle = document.getElementById('results-title');

// Suggestion Wall
const suggestionWallCanvas = document.getElementById('suggestion-wall-canvas');
const suggestionDetailModal = document.getElementById('suggestion-detail-modal');
const modalSugCloseBtn = document.getElementById('modal-sug-close-btn');
const modalSugTitle = document.getElementById('modal-sug-title');
const modalSugCategory = document.getElementById('modal-sug-category');
const modalSugUrgency = document.getElementById('modal-sug-urgency');
const modalSugContent = document.getElementById('modal-sug-content');
const modalSugMeta = document.getElementById('modal-sug-meta');
const modalSugLikeBtn = document.getElementById('modal-sug-like-btn');
const modalSugLikesCount = document.getElementById('modal-sug-likes-count');

// Student Care Centre
const helpRequestForm = document.getElementById('help-request-form');
const helpTitle = document.getElementById('help-title');
const helpCategory = document.getElementById('help-category');
const helpDescription = document.getElementById('help-description');
const helpInstagram = document.getElementById('help-instagram');
const visitorChatContainer = document.getElementById('visitor-chat-container');
const chatActiveSession = document.getElementById('chat-active-session');
const chatNoSession = document.getElementById('chat-no-session');
const chatTicketIdBadge = document.getElementById('chat-ticket-id-badge');
const visitorChatMessages = document.getElementById('visitor-chat-messages');
const visitorChatForm = document.getElementById('visitor-chat-form');
const visitorChatInput = document.getElementById('visitor-chat-input');

// Admin Panel
const adminLoginForm = document.getElementById('admin-login-form');
const adminUsername = document.getElementById('admin-username');
const adminPassword = document.getElementById('admin-password');
const adminDashboardPanel = document.getElementById('admin-dashboard-panel');
const adminLoginCard = document.getElementById('admin-login-card');
const adminLogoutBtn = document.getElementById('admin-logout-btn');
const adminTabBtns = document.querySelectorAll('.admin-tab-btn');
const adminTabContents = document.querySelectorAll('.admin-tab-content');
const adminPendingMaterialsCount = document.getElementById('admin-pending-materials-count');
const adminPendingSugCount = document.getElementById('admin-pending-sug-count');
const adminHelpCount = document.getElementById('admin-help-count');
const adminMaterialsTableBody = document.getElementById('admin-materials-table-body');
const adminSuggestionsTableBody = document.getElementById('admin-suggestions-table-body');
const adminCareTicketsList = document.getElementById('admin-care-tickets-list');
const adminCareChatPane = document.getElementById('admin-care-chat-pane');
const adminCareChatActive = document.getElementById('admin-care-chat-active');
const adminCareChatEmpty = document.getElementById('admin-care-chat-empty');
const adminChatTicketTitle = document.getElementById('admin-chat-ticket-title');
const adminChatTicketMood = document.getElementById('admin-chat-ticket-mood');
const adminChatTicketInstagram = document.getElementById('admin-chat-ticket-instagram');
const adminChatTicketDesc = document.getElementById('admin-chat-ticket-desc');
const adminChatMessages = document.getElementById('admin-chat-messages');
const adminChatForm = document.getElementById('admin-chat-form');
const adminChatInput = document.getElementById('admin-chat-input');
const adminCloseTicketBtn = document.getElementById('admin-close-ticket-btn');
const adminPendingExpCount = document.getElementById('admin-pending-exp-count');
const adminExperiencesTableBody = document.getElementById('admin-experiences-table-body');
const adminStatMaterialsCount = document.getElementById('admin-stat-materials-count');
const adminStatSugCount = document.getElementById('admin-stat-sug-count');
const adminStatHelpCount = document.getElementById('admin-stat-help-count');
const adminStatExpCount = document.getElementById('admin-stat-exp-count');
const adminSearchInput = document.getElementById('admin-search-input');
const adminSearchBtn = document.getElementById('admin-search-btn');
const adminSearchResultsBox = document.getElementById('admin-search-results-box');

// Senior Experiences
const seniorExperienceForm = document.getElementById('senior-experience-form');
const expTitle = document.getElementById('exp-title');
const expCompany = document.getElementById('exp-company');
const expContent = document.getElementById('exp-content');
const expContact = document.getElementById('exp-contact');
const experiencesCanvas = document.getElementById('experiences-canvas');

// Experience Detail Modal Elements
const experienceModal = document.getElementById('experience-modal');
const modalExpCloseBtn = document.getElementById('modal-exp-close-btn');
const modalExpTitle = document.getElementById('modal-exp-title');
const modalExpCompany = document.getElementById('modal-exp-company');
const modalExpContent = document.getElementById('modal-exp-content');

// Modal Elements
const previewModal = document.getElementById('preview-modal');
const modalCloseBtn = document.getElementById('modal-close-btn');
const modalDocType = document.getElementById('modal-doc-type');
const modalDocTitle = document.getElementById('modal-doc-title');
const modalDocSubject = document.getElementById('modal-doc-subject');
const modalDocYear = document.getElementById('modal-doc-year');
const modalDocExamType = document.getElementById('modal-doc-exam-type');
const modalDocSemester = document.getElementById('modal-doc-semester');
const modalDocDesc = document.getElementById('modal-doc-desc');
const modalDocTags = document.getElementById('modal-doc-tags');
const modalBookmarkBtn = document.getElementById('modal-bookmark-btn');
const modalShareBtn = document.getElementById('modal-share-btn');
const pdfCurrentPage = document.getElementById('pdf-current-page');
const pdfTotalPages = document.getElementById('pdf-total-pages');
const pdfZoomIn = document.getElementById('pdf-zoom-in');
const pdfZoomOut = document.getElementById('pdf-zoom-out');
const pdfDownloadBtn = document.getElementById('pdf-download-btn');
const mockSheet = document.getElementById('mock-sheet');
const personalNotesTextarea = document.getElementById('personal-doc-notes');
const saveNoteBtn = document.getElementById('save-note-btn');

// Form Upload Elements
const uploadForm = document.getElementById('upload-form');
const uploadTitle = document.getElementById('upload-title');
const uploadCategory = document.getElementById('upload-category');
const uploadSubject = document.getElementById('upload-subject');
const uploadSemester = document.getElementById('upload-semester');
const uploadYear = document.getElementById('upload-year');
const uploadExamType = document.getElementById('upload-exam-type');
const uploadTags = document.getElementById('upload-tags');
const uploadDescription = document.getElementById('upload-description');
const fileDropArea = document.getElementById('file-drop-area');
const fileInput = document.getElementById('upload-file');
const selectedFileInfo = document.getElementById('selected-file-info');
const selectedFileName = document.getElementById('selected-file-name');
const removeFileBtn = document.getElementById('remove-file-btn');
const resetUploadBtn = document.getElementById('reset-upload-btn');
const pyqOptionsRow = document.getElementById('upload-pyq-options');

// --- INIT APP ---
document.addEventListener("DOMContentLoaded", async () => {
  // Load State from LocalStorage or seed defaults
  await loadDatabase();

  // Populate dynamic views mapping
  document.querySelectorAll('.app-view').forEach(view => {
    viewElements[view.id.replace('view-', '')] = view;
  });

  // Init Dynamic Sidebar router
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetView = link.getAttribute('data-view');
      navigateTo(targetView);
    });
  });

  // Mobile navigation trigger
  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      sidebar.classList.toggle('mobile-open');
    });
  }

  // Setup form dropzone events
  setupDropzone();

  // Populate UI templates
  initExplorerFilters();
  initFormSubjectsDropdown();
  initPYQFiltersDropdowns();
  initFinderSubjectsDropdown();
  
  // Bind Header Back Button Click
  if (headerBackBtn) {
    headerBackBtn.addEventListener('click', () => {
      if (navigationHistory.length > 0) {
        const previousView = navigationHistory.pop();
        navigateTo(previousView, false);
      }
    });
  }

  // Bind browser history back/forward navigation
  window.addEventListener('hashchange', () => {
    const currentHash = window.location.hash.replace('#', '') || 'dashboard';
    if (currentView !== currentHash) {
      navigateTo(currentHash, false);
    }
  });

  // Attach general listeners
  setupModalListeners();
  setupGlobalListeners();
  setupFeedbackBox();
  setupThemeToggle();
  setupFinderPanel();
  setupHelpCenter();
  setupAdminDashboard();
  setupSeniorExperiences();

  // Load router default hash or dashboard view
  const initialHash = window.location.hash.replace('#', '') || 'dashboard';
  navigateTo(initialHash);
  
  // Render lucide icons
  lucide.createIcons();
});

async function loadDatabase() {

  try {
    const [
      firestoreSubjects,
      firestoreMaterials,
      firestoreSuggestions,
      firestoreHelpRequests,
      firestoreExperiences
    ] = await Promise.all([
      getCollection("subjects"),
      getCollection("materials"),
      getCollection("suggestions"),
      getCollection("helpRequests"),
      getCollection("experiences")
    ]);

    subjects = firestoreSubjects.length
      ? firestoreSubjects
      : DEFAULT_SUBJECTS;

    materials = firestoreMaterials.length
      ? firestoreMaterials
      : DEFAULT_MATERIALS;

    suggestions = firestoreSuggestions.length
      ? firestoreSuggestions
      : DEFAULT_SUGGESTIONS;

    helpRequests = firestoreHelpRequests.length
      ? firestoreHelpRequests
      : DEFAULT_HELP_REQUESTS;

    seniorExperiences = firestoreExperiences.length
      ? firestoreExperiences
      : DEFAULT_EXPERIENCES;

    console.log("Loaded data from Firestore");
    saveLocalCache();

  } catch (error) {

    console.error("Firestore Error:", error);

    subjects = JSON.parse(localStorage.getItem("hub_subjects")) || DEFAULT_SUBJECTS;
    materials = JSON.parse(localStorage.getItem("hub_materials")) || DEFAULT_MATERIALS;
    suggestions = JSON.parse(localStorage.getItem("hub_suggestions")) || DEFAULT_SUGGESTIONS;
    helpRequests = JSON.parse(localStorage.getItem("hub_help_requests")) || DEFAULT_HELP_REQUESTS;
    seniorExperiences = JSON.parse(localStorage.getItem("hub_senior_experiences")) || DEFAULT_EXPERIENCES;

  }

  // Load and merge local-only bookmarks state
  const bookmarkedIds = JSON.parse(localStorage.getItem('hub_bookmarked_ids')) || [];
  materials.forEach(m => {
    m.bookmarked = bookmarkedIds.includes(m.id);
  });

  materials.forEach(m => {
    if (m.approved === undefined) m.approved = true;
  });

  suggestions.forEach(s => {
    if (s.approved === undefined) s.approved = true;
  });

  helpRequests.forEach(h => {
    if (h.approved === undefined) h.approved = true;
  });

  seniorExperiences.forEach(e => {
    if (e.approved === undefined) e.approved = true;
  });

  notifications = JSON.parse(localStorage.getItem("hub_notifications")) || DEFAULT_NOTIFICATIONS;
  personalNotes = JSON.parse(localStorage.getItem("hub_personal_notes")) || {};

}

function saveLocalCache() {
  localStorage.setItem('hub_subjects', JSON.stringify(subjects));
  localStorage.setItem('hub_materials', JSON.stringify(materials));
  localStorage.setItem('hub_notifications', JSON.stringify(notifications));
  localStorage.setItem('hub_personal_notes', JSON.stringify(personalNotes));
  localStorage.setItem('hub_suggestions', JSON.stringify(suggestions));
  localStorage.setItem('hub_help_requests', JSON.stringify(helpRequests));
  localStorage.setItem('hub_senior_experiences', JSON.stringify(seniorExperiences));
}

function saveDatabase() {
  localStorage.setItem('hub_notifications', JSON.stringify(notifications));
  localStorage.setItem('hub_personal_notes', JSON.stringify(personalNotes));
}

function createNotification(title, text, type) {
  const newNotif = {
    id: `notif-${Date.now()}`,
    text: `${title}: ${text}`,
    time: 'Just now',
    type: type || 'system',
    unread: true
  };
  notifications.unshift(newNotif);
  saveDatabase();
  updateNotificationsBadge();
}
// --- DYNAMIC ELEMENT TEMPLATE GENERATORS ---
function initExplorerFilters() {
  const semesterTabs = document.getElementById('semester-tabs');
  const deptPills = document.getElementById('dept-pills');

  // Generate 8 semester tabs
  semesterTabs.innerHTML = '';
  for (let i = 1; i <= 8; i++) {
    const activeClass = i.toString() === activeFilters.explorerSem ? 'active' : '';
    semesterTabs.innerHTML += `
      <button class="sem-tab-btn ${activeClass}" data-sem="${i}" onclick="setExplorerSemFilter('${i}')">
        Semester ${i}
      </button>
    `;
  }

  // Generate department pills
  const departments = [
    { key: 'CS', name: 'Computer Science' },
    { key: 'EE', name: 'Electrical Eng.' },
    { key: 'ME', name: 'Mechanical Eng.' },
    { key: 'CE', name: 'Civil Eng.' },
    { key: 'AS', name: 'Applied Sciences' }
  ];

  deptPills.innerHTML = '';
  departments.forEach(dept => {
    const activeClass = dept.key === activeFilters.explorerDept ? 'active' : '';
    deptPills.innerHTML += `
      <span class="dept-pill ${activeClass}" data-dept="${dept.key}" onclick="setExplorerDeptFilter('${dept.key}')">
        ${dept.name}
      </span>
    `;
  });
}

function initFormSubjectsDropdown() {
  const selectElement = document.getElementById('upload-subject');
  selectElement.innerHTML = '<option value="" disabled selected>Select Subject</option>';
  
  // Sort alphabetically by code
  const sorted = [...subjects].sort((a, b) => a.code.localeCompare(b.code));
  sorted.forEach(sub => {
    selectElement.innerHTML += `<option value="${sub.code}">${sub.code} - ${sub.name}</option>`;
  });
}

function initPYQFiltersDropdowns() {
  const subSelect = document.getElementById('pyq-subject-select');
  subSelect.innerHTML = '<option value="all">All Subjects</option>';
  
  const sorted = [...subjects].sort((a, b) => a.code.localeCompare(b.code));
  sorted.forEach(sub => {
    subSelect.innerHTML += `<option value="${sub.code}">${sub.code} - ${sub.name}</option>`;
  });
}

function initFinderSubjectsDropdown() {
  const selectElement = document.getElementById('finder-subject-select');
  if (!selectElement) return;
  selectElement.innerHTML = '<option value="">Choose Subject...</option>';
  
  const sorted = [...subjects].sort((a, b) => a.code.localeCompare(b.code));
  sorted.forEach(sub => {
    selectElement.innerHTML += `<option value="${sub.code}">${sub.code} - ${sub.name}</option>`;
  });
}

// --- ROUTING ENGINE ---
function navigateTo(viewName, updateHistory = true) {
  // Hide active details in Explorer when navigating back/forth
  if (viewName !== 'explorer') {
    closeSubjectDetail();
  }

  // Hide mobile sidebar
  sidebar.classList.remove('mobile-open');

  // History stack management
  if (currentView !== viewName) {
    if (updateHistory) {
      if (navigationHistory.length === 0 || navigationHistory[navigationHistory.length - 1] !== currentView) {
        navigationHistory.push(currentView);
      }
    }
    currentView = viewName;
  }

  // Show/Hide header back button
  if (headerBackBtn) {
    if (navigationHistory.length > 0) {
      headerBackBtn.style.display = 'flex';
      headerBackBtn.classList.remove('hidden');
    } else {
      headerBackBtn.style.display = 'none';
      headerBackBtn.classList.add('hidden');
    }
  }

  // Update URL hash
  window.location.hash = viewName;

  // Toggle visible sections
  Object.keys(viewElements).forEach(viewKey => {
    if (viewKey === viewName) {
      viewElements[viewKey].classList.add('active');
    } else {
      viewElements[viewKey].classList.remove('active');
    }
  });

  // Toggle Sidebar active states
  navLinks.forEach(link => {
    if (link.getAttribute('data-view') === viewName) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  // Update header text
  const viewTitles = {
    dashboard: 'Dashboard',
    explorer: 'Course Explorer',
    pyqs: 'PYQ Bank',
    bookmarks: 'My Bookmarks',
    upload: 'Contribute Material',
    feedback: 'Suggestion Box',
    'suggestion-wall': 'Suggestion Wall',
    'help-center': 'Student Care Centre',
    'senior-experiences': 'Senior Wisdom',
    admin: 'Admin Portal'
  };
  pageTitle.textContent = viewTitles[viewName] || 'StudySphere';

  // Render view-specific templates
  renderViewData(viewName);
}

function renderViewData(viewName) {
  switch (viewName) {
    case 'dashboard':
      renderDashboard();
      break;
    case 'explorer':
      if (selectedSubject) {
        renderSubjectDetailMaterials();
      } else {
        renderExplorerSubjects();
      }
      break;
    case 'pyqs':
      renderPYQBank();
      break;
    case 'bookmarks':
      renderBookmarks();
      break;
    case 'feedback':
      renderSuggestions();
      break;
    case 'suggestion-wall':
      renderSuggestionWall();
      break;
    case 'help-center':
      renderHelpCenter();
      break;
    case 'senior-experiences':
      renderSeniorExperiences();
      break;
    case 'admin':
      renderAdminDashboard();
      break;
  }
}

// --- VIEW RENDERING HELPERS ---
function renderDashboard() {
  // Stats counters
  document.getElementById('stat-subjects-count').textContent = subjects.length;
  document.getElementById('stat-pyqs-count').textContent = materials.filter(m => m.approved && m.category === 'pyq').length;
  document.getElementById('stat-bookmarks-count').textContent = materials.filter(m => m.approved && m.bookmarked).length;
  document.getElementById('stat-contributions-count').textContent = materials.filter(m => m.approved && m.author !== 'Admin').length;

  // Recent Materials list (Sort by download count or recent ID)
  const recentList = document.getElementById('recent-materials-list');
  recentList.innerHTML = '';

  // Grab first 4 approved items
  const recents = materials.filter(m => m.approved).slice(0, 4);
  
  if (recents.length === 0) {
    recentList.innerHTML = '<div style="padding:20px; text-align:center; color:var(--text-muted); font-size:0.85rem;">No materials available.</div>';
    return;
  }

  recents.forEach(item => {
    const isBookmarked = item.bookmarked ? 'active' : '';
    const subject = subjects.find(s => s.code === item.subjectCode) || { name: 'Unknown' };
    
    recentList.innerHTML += `
      <div class="material-item-row animate-glow" data-id="${item.id}">
        <div class="item-left">
          <div class="file-type-icon ${item.category}">
            <i data-lucide="${getFileIconName(item.category)}"></i>
          </div>
          <div class="item-text-info">
            <span class="item-title-link" onclick="openPreviewModal('${item.id}')">${item.title}</span>
            <span class="item-meta-sub">${item.subjectCode} • ${subject.name} • Sem ${item.semester}</span>
          </div>
        </div>
        <div class="item-right">
          <button class="bookmark-icon-btn ${isBookmarked}" onclick="toggleBookmark('${item.id}', this)" title="Bookmark file">
            <i data-lucide="bookmark"></i>
          </button>
        </div>
      </div>
    `;
  });
  
  lucide.createIcons();
}

function renderExplorerSubjects() {
  const grid = document.getElementById('subjects-grid');
  grid.innerHTML = '';

  // Filter subjects based on state
  const filteredSubjects = subjects.filter(sub => 
    sub.semester === activeFilters.explorerSem && sub.department === activeFilters.explorerDept
  );

  if (filteredSubjects.length === 0) {
    grid.innerHTML = `
      <div class="empty-state" style="grid-column: 1/-1; max-width: 100%;">
        <i data-lucide="folder-open" class="empty-icon"></i>
        <h3>No Subjects Found</h3>
        <p>No subjects are currently listed for Semester ${activeFilters.explorerSem} in this department.</p>
      </div>
    `;
    lucide.createIcons();
    return;
  }

  filteredSubjects.forEach(sub => {
    // calculate actual document counts in DB (only count approved)
    const subMaterials = materials.filter(m => m.approved && m.subjectCode === sub.code);
    const pyqCount = subMaterials.filter(m => m.category === 'pyq').length;
    const notesCount = subMaterials.filter(m => m.category !== 'pyq').length;

    grid.innerHTML += `
      <div class="subject-card neon-border" onclick="openSubjectDetail('${sub.code}')">
        <div class="card-header-top">
          <span class="subject-code">${sub.code}</span>
          <i data-lucide="folder" class="card-icon"></i>
        </div>
        <h3>${sub.name}</h3>
        <div class="card-footer">
          <span class="count-stat pyq"><i data-lucide="file-text"></i> ${pyqCount} PYQ${pyqCount === 1 ? '' : 's'}</span>
          <span class="count-stat notes"><i data-lucide="edit-3"></i> ${notesCount} Study Doc${notesCount === 1 ? '' : 's'}</span>
        </div>
      </div>
    `;
  });

  lucide.createIcons();
}

function renderSubjectDetailMaterials() {
  const detailMaterialsGrid = document.getElementById('detail-materials-grid');
  detailMaterialsGrid.innerHTML = '';

  // Filter approved materials
  const subMaterials = materials.filter(m => 
    m.approved &&
    m.subjectCode === selectedSubject.code && 
    (activeFilters.explorerType === 'all' || m.category === activeFilters.explorerType)
  );

  if (subMaterials.length === 0) {
    detailMaterialsGrid.innerHTML = `
      <div class="empty-state" style="grid-column: 1/-1; max-width: 100%;">
        <i data-lucide="file" class="empty-icon"></i>
        <h3>No Documents Available</h3>
        <p>There are no study documents in this category for ${selectedSubject.code} yet.</p>
      </div>
    `;
    lucide.createIcons();
    return;
  }

  subMaterials.forEach(item => {
    const isBookmarked = item.bookmarked ? 'active' : '';
    const bookmarkLabel = item.bookmarked ? 'Bookmarked' : 'Bookmark';
    
    detailMaterialsGrid.innerHTML += `
      <div class="material-card neon-border" data-id="${item.id}">
        <div class="material-card-header">
          <span class="material-type-tag ${item.category}">${item.category === 'pyq' ? item.examType : item.category}</span>
          <button class="bookmark-icon-btn ${isBookmarked}" onclick="toggleBookmark('${item.id}', this)" title="Bookmark file">
            <i data-lucide="bookmark"></i>
          </button>
        </div>
        <h4>${item.title}</h4>
        <p class="material-desc">${item.description}</p>
        <div class="material-metadata">
          <div class="meta-sub-info">
            ${item.category === 'pyq' ? `<span>${item.year}</span>` : ''}
          </div>
          <span class="meta-downloads"><i data-lucide="download"></i> ${item.downloads}</span>
        </div>
        <div class="material-actions-row">
          <button class="primary-btn flex-1" onclick="openPreviewModal('${item.id}')">
            <i data-lucide="eye"></i> View File
          </button>
        </div>
      </div>
    `;
  });

  lucide.createIcons();
}

function renderPYQBank() {
  const grid = document.getElementById('pyq-bank-grid');
  grid.innerHTML = '';

  const filteredPYQs = materials.filter(item => {
    if (item.category !== 'pyq' || !item.approved) return false;
    
    const matchesYear = activeFilters.pyqYear === 'all' || item.year === activeFilters.pyqYear;
    const matchesExam = activeFilters.pyqExam === 'all' || item.examType === activeFilters.pyqExam;
    const matchesSubject = activeFilters.pyqSubject === 'all' || item.subjectCode === activeFilters.pyqSubject;
    
    return matchesYear && matchesExam && matchesSubject;
  });

  if (filteredPYQs.length === 0) {
    grid.innerHTML = `
      <div class="empty-state" style="grid-column: 1/-1; max-width: 100%;">
        <i data-lucide="search-x" class="empty-icon"></i>
        <h3>No PYQ Papers Found</h3>
        <p>Try clearing your dropdown search filter selections to see more results.</p>
      </div>
    `;
    lucide.createIcons();
    return;
  }

  filteredPYQs.forEach(item => {
    const isBookmarked = item.bookmarked ? 'active' : '';
    const subject = subjects.find(s => s.code === item.subjectCode) || { name: 'Unknown' };

    grid.innerHTML += `
      <div class="material-card neon-border" data-id="${item.id}">
        <div class="material-card-header">
          <span class="material-type-tag pyq">${item.examType} • ${item.year}</span>
          <button class="bookmark-icon-btn ${isBookmarked}" onclick="toggleBookmark('${item.id}', this)" title="Bookmark file">
            <i data-lucide="bookmark"></i>
          </button>
        </div>
        <h4>${item.title}</h4>
        <p class="material-desc" style="margin-bottom:8px;">${subject.name} (${item.subjectCode})</p>
        <div class="material-metadata">
          <span class="meta-downloads"><i data-lucide="download"></i> ${item.downloads}</span>
        </div>
        <div class="material-actions-row">
          <button class="primary-btn flex-1" onclick="openPreviewModal('${item.id}')">
            <i data-lucide="eye"></i> Open Paper
          </button>
        </div>
      </div>
    `;
  });

  lucide.createIcons();
}

function renderBookmarks() {
  const grid = document.getElementById('bookmarks-grid');
  const emptyState = document.getElementById('bookmarks-empty-state');
  
  grid.innerHTML = '';
  const list = materials.filter(m => m.approved && m.bookmarked);

  if (list.length === 0) {
    grid.style.display = 'none';
    emptyState.classList.remove('hidden');
    return;
  }

  grid.style.display = 'grid';
  emptyState.classList.add('hidden');

  list.forEach(item => {
    const subject = subjects.find(s => s.code === item.subjectCode) || { name: 'Unknown' };
    
    grid.innerHTML += `
      <div class="material-card neon-border" data-id="${item.id}">
        <div class="material-card-header">
          <span class="material-type-tag ${item.category}">${item.category === 'pyq' ? item.examType : item.category}</span>
          <button class="bookmark-icon-btn active" onclick="toggleBookmark('${item.id}', this)" title="Remove bookmark">
            <i data-lucide="bookmark"></i>
          </button>
        </div>
        <h4>${item.title}</h4>
        <p class="material-desc">${subject.name} (${item.subjectCode})</p>
        <div class="material-metadata">
          <span class="meta-downloads"><i data-lucide="download"></i> ${item.downloads}</span>
        </div>
        <div class="material-actions-row">
          <button class="primary-btn flex-1" onclick="openPreviewModal('${item.id}')">
            <i data-lucide="eye"></i> View File
          </button>
        </div>
      </div>
    `;
  });

  lucide.createIcons();
}

// --- DYNAMIC SEARCH SUGGESTION ENGINE ---
globalSearch.addEventListener('input', (e) => {
  const query = e.target.value.toLowerCase().trim();
  if (query.length < 2) {
    searchSuggestions.classList.add('hidden');
    return;
  }

  // Search subjects and documents
  const matchedSubjects = subjects.filter(s => 
    s.name.toLowerCase().includes(query) || s.code.toLowerCase().includes(query)
  );

  const matchedMaterials = materials.filter(m => 
    m.title.toLowerCase().includes(query) || 
    m.tags.some(tag => tag.toLowerCase().includes(query))
  );

  if (matchedSubjects.length === 0 && matchedMaterials.length === 0) {
    searchSuggestions.innerHTML = '<div class="suggestion-item"><span class="item-title">No matches found</span></div>';
    searchSuggestions.classList.remove('hidden');
    return;
  }

  searchSuggestions.innerHTML = '';
  
  // Render subject suggestions
  matchedSubjects.slice(0, 3).forEach(sub => {
    const item = document.createElement('div');
    item.className = 'suggestion-item';
    item.innerHTML = `
      <span class="item-title"><i data-lucide="folder" style="width:14px;height:14px;vertical-align:middle;margin-right:6px;"></i> ${sub.code}: ${sub.name}</span>
      <span class="item-meta">Subject Explorer</span>
    `;
    item.addEventListener('click', () => {
      activeFilters.explorerSem = sub.semester;
      activeFilters.explorerDept = sub.department;
      initExplorerFilters(); // Refresh tabs
      selectedSubject = sub;
      navigateTo('explorer');
      searchSuggestions.classList.add('hidden');
      globalSearch.value = '';
    });
    searchSuggestions.appendChild(item);
  });

  // Render material suggestions
  matchedMaterials.slice(0, 5).forEach(mat => {
    const item = document.createElement('div');
    item.className = 'suggestion-item';
    const subBadge = mat.category === 'pyq' ? mat.examType : mat.category;
    item.innerHTML = `
      <span class="item-title"><i data-lucide="file-text" style="width:14px;height:14px;vertical-align:middle;margin-right:6px;"></i> ${mat.title}</span>
      <span class="item-meta">${subBadge}</span>
    `;
    item.addEventListener('click', () => {
      openPreviewModal(mat.id);
      searchSuggestions.classList.add('hidden');
      globalSearch.value = '';
    });
    searchSuggestions.appendChild(item);
  });

  searchSuggestions.classList.remove('hidden');
  lucide.createIcons();
});

// Close suggestions on outside click
document.addEventListener('click', (e) => {
  if (!globalSearch.contains(e.target) && !searchSuggestions.contains(e.target)) {
    searchSuggestions.classList.add('hidden');
  }
});

// --- CUSTOM INTERACTIVE CONTROLS ---
function setExplorerSemFilter(sem) {
  activeFilters.explorerSem = sem;
  selectedSubject = null; // Close detail if tab changed
  closeSubjectDetail();
  
  // Update Tab selection active states in UI
  document.querySelectorAll('#semester-tabs .sem-tab-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-sem') === sem);
  });
  renderExplorerSubjects();
}

function setExplorerDeptFilter(dept) {
  activeFilters.explorerDept = dept;
  selectedSubject = null;
  closeSubjectDetail();

  document.querySelectorAll('#dept-pills .dept-pill').forEach(pill => {
    pill.classList.toggle('active', pill.getAttribute('data-dept') === dept);
  });
  renderExplorerSubjects();
}

function quickFilter(type) {
  // Convert plural types into singular matching category
  const mapType = {
    notes: 'notes',
    pyqs: 'pyq',
    books: 'book'
  };
  
  const mapped = mapType[type] || 'all';
  activeFilters.explorerType = mapped;

  // Change nav selection to explorer
  navigateTo('explorer');
  
  // Set tab selectors inside Detail view if viewing a subject, or just show list.
  // We can default explorer view with that material type filter
  document.querySelectorAll('.filter-tab').forEach(tab => {
    tab.classList.toggle('active', tab.getAttribute('data-type') === mapped);
  });
}

function openSubjectDetail(code) {
  const sub = subjects.find(s => s.code === code);
  if (!sub) return;

  selectedSubject = sub;
  
  // Setup elements
  document.getElementById('detail-subject-code').textContent = sub.code;
  document.getElementById('detail-subject-name').textContent = sub.name;
  
  // Toggle Visibility: Hide overall grid, show Detail list
  document.getElementById('subjects-grid').classList.add('hidden');
  document.getElementById('subject-materials-detail').classList.remove('hidden');
  
  // Reset filter tab to "all"
  activeFilters.explorerType = 'all';
  document.querySelectorAll('.filter-tab').forEach(tab => {
    tab.classList.toggle('active', tab.getAttribute('data-type') === 'all');
  });

  renderSubjectDetailMaterials();
}

function closeSubjectDetail() {
  selectedSubject = null;
  document.getElementById('subjects-grid').classList.remove('hidden');
  document.getElementById('subject-materials-detail').classList.add('hidden');
}

// Back button listener in details view
document.getElementById('subject-detail-back-btn').addEventListener('click', closeSubjectDetail);

// Tab filters inside Detail View (All, PYQs, Notes, Books)
document.querySelectorAll('.filter-tab').forEach(tab => {
  tab.addEventListener('click', (e) => {
    document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    activeFilters.explorerType = tab.getAttribute('data-type');
    renderSubjectDetailMaterials();
  });
});

// PYQ BANK dropdown filter events
document.getElementById('pyq-year-select').addEventListener('change', (e) => {
  activeFilters.pyqYear = e.target.value;
  renderPYQBank();
});

document.getElementById('pyq-exam-select').addEventListener('change', (e) => {
  activeFilters.pyqExam = e.target.value;
  renderPYQBank();
});

document.getElementById('pyq-subject-select').addEventListener('change', (e) => {
  activeFilters.pyqSubject = e.target.value;
  renderPYQBank();
});

// --- BOOKMARK TOGGLE ACTIONS ---
function toggleBookmark(materialId, btnElement) {
  const material = materials.find(m => m.id === materialId);
  if (!material) return;

  material.bookmarked = !material.bookmarked;

  let bookmarkedIds = JSON.parse(localStorage.getItem('hub_bookmarked_ids')) || [];
  if (material.bookmarked) {
    if (!bookmarkedIds.includes(materialId)) {
      bookmarkedIds.push(materialId);
    }
  } else {
    bookmarkedIds = bookmarkedIds.filter(id => id !== materialId);
  }
  localStorage.setItem('hub_bookmarked_ids', JSON.stringify(bookmarkedIds));

  saveDatabase();

  const isBookmarkedNow = material.bookmarked;

  // Toggle active class on all icons representing this document in the view
  document.querySelectorAll(`.material-card[data-id="${materialId}"] .bookmark-icon-btn, .material-item-row[data-id="${materialId}"] .bookmark-icon-btn`).forEach(btn => {
    btn.classList.toggle('active', isBookmarkedNow);
  });

  // If we are currently on the Bookmarks View, we should redraw the view
  if (window.location.hash === '#bookmarks') {
    renderBookmarks();
  }

  // Update navbar stats counters if dashboard is active
  if (window.location.hash === '#dashboard' || window.location.hash === '') {
    document.getElementById('stat-bookmarks-count').textContent = materials.filter(m => m.bookmarked).length;
  }

  // Trigger toast alert
  if (isBookmarkedNow) {
    showToast('Document bookmarked successfully.', 'success');
  } else {
    showToast('Document removed from bookmarks.', 'info');
  }
}

// --- INTERACTIVE MOCK PDF VIEWER ENGINE ---
function openPreviewModal(materialId) {
  const doc = materials.find(m => m.id === materialId);
  if (!doc) return;

  // Set Modal metadata fields
  modalDocType.textContent = doc.category === 'pyq' ? doc.examType : doc.category;
  modalDocType.className = `doc-info-badge ${doc.category}`;
  
  modalDocTitle.textContent = doc.title;
  modalDocSubject.textContent = `${doc.subjectCode} - ${(subjects.find(s => s.code === doc.subjectCode) || {name: 'Unknown'}).name}`;
  modalDocYear.textContent = doc.year;
  modalDocExamType.textContent = doc.category === 'pyq' ? doc.examType : 'N/A';
  modalDocSemester.textContent = `Semester ${doc.semester}`;
  modalDocDesc.textContent = doc.description;

  // Load Tags list
  modalDocTags.innerHTML = '';
  doc.tags.forEach(tag => {
    modalDocTags.innerHTML += `<span class="tag-badge">${tag}</span>`;
  });

  // Bookmark Button state in modal
  modalBookmarkBtn.className = doc.bookmarked ? 'secondary-btn flex-1 active' : 'secondary-btn flex-1';
  modalBookmarkBtn.innerHTML = doc.bookmarked ? '<i data-lucide="bookmark-check"></i> Bookmarked' : '<i data-lucide="bookmark"></i> Bookmark';
  
  // Set dynamic action listeners
  modalBookmarkBtn.onclick = () => {
    const isBookmarkedBtn = modalBookmarkBtn.classList.contains('active');
    toggleBookmark(doc.id, modalBookmarkBtn);
    // Refresh modal button state
    modalBookmarkBtn.classList.toggle('active', !isBookmarkedBtn);
    modalBookmarkBtn.innerHTML = !isBookmarkedBtn ? '<i data-lucide="bookmark-check"></i> Bookmarked' : '<i data-lucide="bookmark"></i> Bookmark';
    lucide.createIcons();
  };

  modalShareBtn.onclick = () => {
    const dummyUrl = `${window.location.origin}${window.location.pathname}#material-${doc.id}`;
    navigator.clipboard.writeText(dummyUrl).then(() => {
      showToast('Document link copied to clipboard!', 'info');
    });
  };

  // Render PDF contents inside the canvas
  renderMockPDFSheet(doc);

  // Load personal notes
  personalNotesTextarea.value = personalNotes[doc.id] || '';
  
  saveNoteBtn.onclick = () => {
    personalNotes[doc.id] = personalNotesTextarea.value;
    saveDatabase();
    showToast('Personal study notes saved.', 'success');
  };

  // Setup Download simulation
  pdfDownloadBtn.onclick = () => {
    dbIncrementDownloads(doc.id);
    showToast(`Downloading file: ${doc.title.toLowerCase().replace(/ /g, '_')}.pdf`, 'success');
    
    // Increments counter on UI if visible
    const cardEl = document.querySelector(`.material-card[data-id="${doc.id}"] .meta-downloads`);
    if (cardEl) {
      cardEl.innerHTML = `<i data-lucide="download"></i> ${doc.downloads}`;
      lucide.createIcons();
    }
  };

  // Open Modal overlay
  previewModal.classList.remove('hidden');
  document.body.style.overflow = 'hidden'; // Lock body scroll

  // Reset zoom
  currentZoom = 100;
  mockSheet.style.transform = `scale(${currentZoom / 100})`;

  lucide.createIcons();
}

function renderMockPDFSheet(doc) {
  document.getElementById('viewer-title').textContent = `${doc.title.toLowerCase().replace(/ /g, '_')}.pdf`;
  
  // Sim pages count
  pdfCurrentPage.textContent = '1';
  pdfTotalPages.textContent = doc.sheetContent.questions.length > 3 ? '2' : '1';

  // Construct sheet layout
  mockSheet.innerHTML = '';
  
  // Header block
  const sheetHeader = document.createElement('div');
  sheetHeader.className = 'sheet-header';
  sheetHeader.innerHTML = `
    <h4>${doc.sheetContent.header}</h4>
    <p>${doc.sheetContent.subject}</p>
    <p>${doc.category === 'pyq' ? 'University Examination Branch' : 'Reference Lecture Series notes'}</p>
  `;
  mockSheet.appendChild(sheetHeader);

  // Marks details
  const metaRow = document.createElement('div');
  metaRow.className = 'sheet-meta-row';
  metaRow.innerHTML = `
    <span>Time: ${doc.sheetContent.duration}</span>
    <span>Limit: ${doc.sheetContent.maxMarks}</span>
  `;
  mockSheet.appendChild(metaRow);

  // Questions / Notes Content list
  const listContainer = document.createElement('div');
  listContainer.className = 'sheet-questions-list';

  doc.sheetContent.questions.forEach(q => {
    const qBlock = document.createElement('div');
    qBlock.className = 'question-block';
    
    let sublistHtml = '';
    if (q.sub && q.sub.length > 0) {
      sublistHtml = '<ol class="question-sublist">';
      q.sub.forEach(subItem => {
        sublistHtml += `<li>${subItem}</li>`;
      });
      sublistHtml += '</ol>';
    }

    qBlock.innerHTML = `
      <div class="question-q">
        <span class="q-num">${q.num}</span>
        <div>
          <span>${q.text}</span>
          ${sublistHtml}
        </div>
      </div>
    `;
    listContainer.appendChild(qBlock);
  });
  mockSheet.appendChild(listContainer);

  // Watermark or disclaimer at bottom
  const footerNote = document.createElement('div');
  footerNote.className = 'sheet-page-note';
  footerNote.style.marginTop = '40px';
  footerNote.style.borderTop = '1px dashed #cccccc';
  footerNote.style.paddingTop = '12px';
  footerNote.style.textAlign = 'center';
  footerNote.innerHTML = `
    <h5 class="sheet-note-title">StudySphere Preview Engine</h5>
    <p>This is a simulated document view of the PDF file. You can download the physical copy using the download button in the toolbar above.</p>
  `;
  mockSheet.appendChild(footerNote);
}

function setupModalListeners() {
  modalCloseBtn.addEventListener('click', closeModal);
  
  // Close on backdrop overlay click
  previewModal.addEventListener('click', (e) => {
    if (e.target === previewModal) {
      closeModal();
    }
  });

  // Zoom handlers
  pdfZoomIn.addEventListener('click', () => {
    if (currentZoom < 150) {
      currentZoom += 10;
      mockSheet.style.transform = `scale(${currentZoom / 100})`;
      mockSheet.style.transformOrigin = 'top center';
    }
  });

  pdfZoomOut.addEventListener('click', () => {
    if (currentZoom > 70) {
      currentZoom -= 10;
      mockSheet.style.transform = `scale(${currentZoom / 100})`;
      mockSheet.style.transformOrigin = 'top center';
    }
  });
}

function closeModal() {
  previewModal.classList.add('hidden');
  document.body.style.overflow = ''; // Restore body scroll
}

// --- FILE UPLOAD (CONTRIBUTION PORTAL) ---
function setupDropzone() {
  // Toggle PYQ options based on category selection
  uploadCategory.addEventListener('change', (e) => {
    if (e.target.value === 'pyq') {
      pyqOptionsRow.classList.remove('hidden');
      uploadYear.setAttribute('required', '');
      uploadExamType.setAttribute('required', '');
    } else {
      pyqOptionsRow.classList.add('hidden');
      uploadYear.removeAttribute('required');
      uploadExamType.removeAttribute('required');
    }
  });

  // Drag and Drop simulation triggers
  fileDropArea.addEventListener('click', () => {
    fileInput.click();
  });

  fileInput.addEventListener('change', (e) => {
    if (e.target.files.length > 0) {
      handleFileSelected(e.target.files[0]);
    }
  });

  // Drag states
  fileDropArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    fileDropArea.classList.add('dragover');
  });

  fileDropArea.addEventListener('dragleave', () => {
    fileDropArea.classList.remove('dragover');
  });

  fileDropArea.addEventListener('drop', (e) => {
    e.preventDefault();
    fileDropArea.classList.remove('dragover');
    if (e.dataTransfer.files.length > 0) {
      handleFileSelected(e.dataTransfer.files[0]);
    }
  });

  removeFileBtn.addEventListener('click', (e) => {
    e.stopPropagation(); // Avoid triggering file selection window
    clearFileInput();
  });

  resetUploadBtn.addEventListener('click', () => {
    uploadForm.reset();
    clearFileInput();
    pyqOptionsRow.classList.add('hidden');
  });

  // Submit Handler
  uploadForm.addEventListener('submit', (e) => {
    e.preventDefault();

    if (!fileInput.files || fileInput.files.length === 0) {
      showToast('Please select a PDF document file to upload.', 'warning');
      return;
    }

    const title = uploadTitle.value;
    const cat = uploadCategory.value;
    const code = uploadSubject.value;
    const sem = uploadSemester.value;
    const desc = uploadDescription.value || 'No description provided.';
    const yearVal = cat === 'pyq' ? uploadYear.value : '2025';
    const examVal = cat === 'pyq' ? uploadExamType.value : 'N/A';
    
    // Parse tags
    const tagsArr = uploadTags.value
      ? uploadTags.value.split(',').map(t => t.trim().toLowerCase()).filter(t => t.length > 0)
      : [cat, code.toLowerCase()];

    // Generate unique ID
    const newId = `mat-${Date.now()}`;

    // Add subject code to tags
    if (!tagsArr.includes(code.toLowerCase())) {
      tagsArr.push(code.toLowerCase());
    }

    // Build mock Questions / outline for preview sheet based on title
    const sheetQuestions = [
      {
        num: '1.',
        text: `Overview notes of ${title}. Includes reference definitions, equations, and solutions.`
      },
      {
        num: '2. Chapter Outline',
        text: 'Detailed concept maps covering major topics discussed during lectures.'
      },
      {
        num: '3. Practice Exercises',
        text: 'Recommended problems to solve for preparation.',
        sub: [
          'Practice Problem A: Basic application of theories.',
          'Practice Problem B: Medium complexity analysis calculations.',
          'Practice Problem C: Design/Case study derivation.'
        ]
      }
    ];

    const newMaterial = {
      id: newId,
      title: title,
      subjectCode: code,
      category: cat,
      year: yearVal,
      examType: examVal,
      author: 'John Doe (You)',
      semester: sem,
      downloads: 0,
      bookmarked: false,
      tags: tagsArr,
      description: desc,
      sheetContent: {
        header: `${cat.toUpperCase()} DOCUMENT PORTAL`,
        subject: `${code.toUpperCase()} - ${(subjects.find(s => s.code === code) || {name: 'Subject'}).name}`,
        duration: 'Student Upload',
        maxMarks: 'Study Resource',
        questions: sheetQuestions
      }
    };
    newMaterial.approved = isAdminLoggedIn; // approved immediately if admin, else pending

    // Insert to DB list and sync
    dbAddMaterial(newMaterial);

    // Create system notification
    const newNotif = {
      id: `notif-${Date.now()}`,
      text: isAdminLoggedIn 
        ? `Your contribution "${title}" has been published by Admin.`
        : `Your contribution "${title}" was submitted and is pending administrator check.`,
      time: 'Just now',
      type: 'uploaded',
      unread: true
    };
    notifications.unshift(newNotif);
    saveDatabase();
    updateNotificationsBadge();

    // Reset upload wizard
    uploadForm.reset();
    clearFileInput();
    pyqOptionsRow.classList.add('hidden');

    // Show feedback
    if (isAdminLoggedIn) {
      showToast('Material published successfully!', 'success');
      navigateTo('dashboard');
    } else {
      showToast('Material submitted for admin review! Thank you for contributing.', 'success');
      navigateTo('dashboard');
    }
  });
}

function handleFileSelected(file) {
  if (file.type !== 'application/pdf') {
    showToast('Invalid file format. Only PDF documents are allowed.', 'warning');
    return;
  }

  selectedFileName.textContent = `${file.name} (${(file.size / (1024 * 1024)).toFixed(2)} MB)`;
  
  // Show file info row, hide drag instruction elements
  selectedFileInfo.classList.remove('hidden');
  document.querySelector('.file-drop-area .drop-icon').style.display = 'none';
  document.querySelector('.file-drop-area .drop-text').style.display = 'none';
}

function clearFileInput() {
  fileInput.value = '';
  selectedFileInfo.classList.add('hidden');
  document.querySelector('.file-drop-area .drop-icon').style.display = 'block';
  document.querySelector('.file-drop-area .drop-text').style.display = 'flex';
}

// --- NOTIFICATION & TOAST POPUP NOTIFIERS ---
function setupGlobalListeners() {
  // Toggle notifications dropdown
  notificationBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    notificationDropdown.classList.toggle('hidden');
    renderNotificationsList();
  });

  // Close notifications list on clicking outside
  document.addEventListener('click', (e) => {
    if (!notificationBtn.contains(e.target) && !notificationDropdown.contains(e.target)) {
      notificationDropdown.classList.add('hidden');
    }
  });

  // Clear notifications mark read
  document.getElementById('clear-notif-btn').addEventListener('click', () => {
    notifications.forEach(n => n.unread = false);
    saveDatabase();
    renderNotificationsList();
    updateNotificationsBadge();
    showToast('All notifications marked as read.', 'info');
  });

  updateNotificationsBadge();
}

function updateNotificationsBadge() {
  const unreadCount = notifications.filter(n => n.unread).length;
  const badge = notificationBtn.querySelector('.badge');
  if (unreadCount > 0) {
    badge.textContent = unreadCount;
    badge.style.display = 'flex';
  } else {
    badge.style.display = 'none';
  }
}

function renderNotificationsList() {
  const list = document.getElementById('notif-list');
  list.innerHTML = '';

  if (notifications.length === 0) {
    list.innerHTML = '<div class="notif-item"><p class="text-muted" style="text-align:center;width:100%;padding:20px 0;">No notifications</p></div>';
    return;
  }

  notifications.forEach(item => {
    const unreadClass = item.unread ? 'unread' : '';
    const icon = item.type === 'uploaded' ? 'file-check' : 'bell';
    const colorClass = item.type === 'uploaded' ? 'uploaded' : '';
    
    list.innerHTML += `
      <div class="notif-item ${unreadClass}" onclick="markNotifRead('${item.id}')">
        <div class="notif-icon ${colorClass}">
          <i data-lucide="${icon}"></i>
        </div>
        <div class="notif-details">
          <span class="notif-text">${item.text}</span>
          <span class="notif-time">${item.time}</span>
        </div>
      </div>
    `;
  });

  lucide.createIcons();
}

function markNotifRead(id) {
  const notif = notifications.find(n => n.id === id);
  if (notif && notif.unread) {
    notif.unread = false;
    saveDatabase();
    updateNotificationsBadge();
    renderNotificationsList();
  }
}

function showToast(message, type = 'success') {
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  
  const icon = type === 'success' ? 'check-circle' : 'info';
  
  toast.innerHTML = `
    <i data-lucide="${icon}"></i>
    <span>${message}</span>
  `;

  toastContainer.appendChild(toast);
  lucide.createIcons();

  // Fade out and remove toast after 3 seconds
  setTimeout(() => {
    toast.style.animation = 'toastIn 0.3s reverse forwards';
    toast.addEventListener('animationend', () => {
      toast.remove();
    });
  }, 3000);
}

// --- CONVENIENCE HELPERS ---
function getFileIconName(cat) {
  switch (cat) {
    case 'pyq': return 'history';
    case 'notes': return 'edit-3';
    case 'book': return 'book';
    case 'syllabus': return 'compass';
    default: return 'file';
  }
}

// --- SUGGESTIONS & PROBLEM BOX HANDLERS ---
// --- FIREBASE LIVE CONNECTION & UTILS ---


const CACHE_EXPIRY_MS = 5 * 60 * 1000; // 5 minutes cache expiry




function refreshActiveView() {
  const currentHash = window.location.hash.replace('#', '') || 'dashboard';
  renderViewData(currentHash);
}

// Database helper functions with Firebase sync
async function dbAddMaterial(material) {
    materials.unshift(material);
    saveLocalCache();
    try {
        await setDocument("materials", material.id || crypto.randomUUID(), material);
    } catch (e) {
        console.error("Firestore Add Material Error:", e);
    }
}

async function dbUpdateMaterial(materialId, updates) {
    const item = materials.find(m => m.id === materialId);
    if (item) {
        Object.assign(item, updates);
        saveLocalCache();
        try {
            await updateDocument("materials", materialId, updates);
        } catch (e) {
            console.error("Firestore Update Material Error:", e);
        }
    }
}

async function dbDeleteMaterial(materialId) {
    materials = materials.filter(m => m.id !== materialId);
    saveLocalCache();
    try {
        await deleteDocument("materials", materialId);
    } catch (e) {
        console.error("Firestore Delete Material Error:", e);
    }
}

async function dbIncrementDownloads(materialId) {
    const item = materials.find(m => m.id === materialId);
    if (item) {
        item.downloads++;
        saveLocalCache();
        try {
            await updateDocument("materials", materialId, { downloads: item.downloads });
        } catch (e) {
            console.error("Firestore Increment Downloads Error:", e);
        }
    }
}

async function dbAddSuggestion(sug) {
    suggestions.unshift(sug);
    saveLocalCache();
    try {
        await setDocument("suggestions", sug.id || crypto.randomUUID(), sug);
    } catch (e) {
        console.error("Firestore Add Suggestion Error:", e);
    }
}

async function dbUpdateSuggestion(sugId, updates) {
    const item = suggestions.find(s => s.id === sugId);
    if (item) {
        Object.assign(item, updates);
        saveLocalCache();
        try {
            await updateDocument("suggestions", sugId, updates);
        } catch (e) {
            console.error("Firestore Update Suggestion Error:", e);
        }
    }
}

async function dbDeleteSuggestion(sugId) {
    suggestions = suggestions.filter(s => s.id !== sugId);
    saveLocalCache();
    try {
        await deleteDocument("suggestions", sugId);
    } catch (e) {
        console.error("Firestore Delete Suggestion Error:", e);
    }
}

async function dbAddHelpRequest(help) {
    helpRequests.unshift(help);
    saveLocalCache();
    try {
        await setDocument("helpRequests", help.id || crypto.randomUUID(), help);
    } catch (e) {
        console.error("Firestore Add Help Request Error:", e);
    }
}

async function dbUpdateHelpRequest(helpId, updates) {
    const item = helpRequests.find(h => h.id === helpId);
    if (item) {
        Object.assign(item, updates);
        saveLocalCache();
        try {
            await updateDocument("helpRequests", helpId, updates);
        } catch (e) {
            console.error("Firestore Update Help Request Error:", e);
        }
    }
}

async function dbDeleteHelpRequest(helpId) {
    helpRequests = helpRequests.filter(h => h.id !== helpId);
    saveLocalCache();
    try {
        await deleteDocument("helpRequests", helpId);
    } catch (e) {
        console.error("Firestore Delete Help Request Error:", e);
    }
}

async function dbAddSeniorExperience(exp) {
    seniorExperiences.unshift(exp);
    saveLocalCache();
    try {
        await setDocument("experiences", exp.id || crypto.randomUUID(), exp);
    } catch (e) {
        console.error("Firestore Add Experience Error:", e);
    }
}

async function dbUpdateSeniorExperience(expId, updates) {
    const item = seniorExperiences.find(e => e.id === expId);
    if (item) {
        Object.assign(item, updates);
        saveLocalCache();
        try {
            await updateDocument("experiences", expId, updates);
        } catch (e) {
            console.error("Firestore Update Experience Error:", e);
        }
    }
}

async function dbDeleteSeniorExperience(expId) {
    seniorExperiences = seniorExperiences.filter(e => e.id !== expId);
    saveLocalCache();
    try {
        await deleteDocument("experiences", expId);
    } catch (e) {
        console.error("Firestore Delete Experience Error:", e);
    }
}


// --- THEME MODE CONTROLLER ---
function setupThemeToggle() {
  if (!themeToggleBtn) return;
  
  // Load saved theme
  const savedTheme = localStorage.getItem('theme') || 'dark';
  if (savedTheme === 'light') {
    document.body.classList.add('light-theme');
    themeIconDark.style.display = 'none';
    themeIconLight.style.display = 'block';
  } else {
    document.body.classList.remove('light-theme');
    themeIconDark.style.display = 'block';
    themeIconLight.style.display = 'none';
  }

  themeToggleBtn.addEventListener('click', () => {
    const isLight = document.body.classList.toggle('light-theme');
    if (isLight) {
      localStorage.setItem('theme', 'light');
      themeIconDark.style.display = 'none';
      themeIconLight.style.display = 'block';
      showToast('Bright Theme Mode Active.', 'info');
    } else {
      localStorage.setItem('theme', 'dark');
      themeIconDark.style.display = 'block';
      themeIconLight.style.display = 'none';
      showToast('Dark Theme Mode Active.', 'info');
    }
    // Refresh visitor care chat if on care center
    if (window.location.hash === '#help-center') {
      renderVisitorChat();
    }
  });
}


// --- INTERACTIVE FINDER PANEL SEARCH CONTROLS ---
function setupFinderPanel() {
  if (!finderForm) return;

  finderForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const courseSelectVal = finderCourseSelect.value;
    const courseManualVal = finderCourseManual.value.trim();
    const yearSelectVal = finderYearSelect.value;
    const yearManualVal = finderYearManual.value.trim();
    const semSelectVal = finderSemSelect.value;
    const subjectSelectVal = finderSubjectSelect.value;
    const subjectManualVal = finderSubjectManual.value.trim();
    const bookVal = finderBook.value.trim().toLowerCase();

    // Matching Queries
    const courseQuery = (courseManualVal || courseSelectVal || '').toLowerCase();
    const yearQuery = (yearManualVal || yearSelectVal || '').toLowerCase();
    const subjectQuery = (subjectManualVal || subjectSelectVal || '').toLowerCase();

    const results = materials.filter(item => {
      // Must be approved study material
      if (!item.approved) return false;

      // Match Semester
      if (semSelectVal && item.semester !== semSelectVal) return false;

      // Match Course
      if (courseQuery) {
        // Find subject info to map department
        const subject = subjects.find(s => s.code === item.subjectCode) || {};
        const deptMatch = subject.department && subject.department.toLowerCase().includes(courseQuery);
        const nameMatch = subject.name && subject.name.toLowerCase().includes(courseQuery);
        const tagMatch = item.tags && item.tags.some(t => t.includes(courseQuery));
        if (!deptMatch && !nameMatch && !tagMatch && !item.title.toLowerCase().includes(courseQuery)) {
          return false;
        }
      }

      // Match Year
      if (yearQuery && item.year !== yearQuery && !item.title.toLowerCase().includes(yearQuery)) {
        return false;
      }

      // Match Subject
      if (subjectQuery) {
        const subject = subjects.find(s => s.code === item.subjectCode) || {};
        const codeMatch = item.subjectCode.toLowerCase().includes(subjectQuery);
        const nameMatch = subject.name && subject.name.toLowerCase().includes(subjectQuery);
        if (!codeMatch && !nameMatch) return false;
      }

      // Match Book Name (optional check tags or description)
      if (bookVal) {
        const titleMatch = item.title.toLowerCase().includes(bookVal);
        const descMatch = item.description && item.description.toLowerCase().includes(bookVal);
        const tagMatch = item.tags && item.tags.some(t => t.includes(bookVal));
        if (!titleMatch && !descMatch && !tagMatch) return false;
      }

      return true;
    });

    renderFinderResults(results);
  });

  finderClearBtn.addEventListener('click', () => {
    finderForm.reset();
    finderResultsSection.classList.add('hidden');
  });

  closeResultsBtn.addEventListener('click', () => {
    finderResultsSection.classList.add('hidden');
  });
}

function renderFinderResults(resultsList) {
  finderResultsGrid.innerHTML = '';
  resultsTitle.textContent = `Search Results (${resultsList.length} file${resultsList.length === 1 ? '' : 's'} found)`;

  if (resultsList.length === 0) {
    finderResultsGrid.innerHTML = `
      <div class="empty-state" style="grid-column:1/-1; max-width:100%; box-shadow:none; border:none; background:transparent;">
        <i data-lucide="search-x" class="empty-icon"></i>
        <h3>No Matching Materials</h3>
        <p>No documents found matching your filter selection. Try modifying the fields.</p>
      </div>
    `;
    finderResultsSection.classList.remove('hidden');
    lucide.createIcons();
    return;
  }

  resultsList.forEach(item => {
    const isBookmarked = item.bookmarked ? 'active' : '';
    const subject = subjects.find(s => s.code === item.subjectCode) || { name: 'Unknown' };

    finderResultsGrid.innerHTML += `
      <div class="material-card neon-border animate-glow" data-id="${item.id}">
        <div class="material-card-header">
          <span class="material-type-tag ${item.category}">${item.category === 'pyq' ? item.examType : item.category}</span>
          <button class="bookmark-icon-btn ${isBookmarked}" onclick="toggleBookmark('${item.id}', this)" title="Bookmark file">
            <i data-lucide="bookmark"></i>
          </button>
        </div>
        <h4>${item.title}</h4>
        <p class="material-desc">${subject.name} (${item.subjectCode}) • Sem ${item.semester}</p>
        <div class="material-metadata">
          <span class="meta-downloads"><i data-lucide="download"></i> ${item.downloads}</span>
        </div>
        <div class="material-actions-row">
          <button class="primary-btn flex-1" onclick="openPreviewModal('${item.id}')">
            <i data-lucide="eye"></i> Preview & Download
          </button>
        </div>
      </div>
    `;
  });

  finderResultsSection.classList.remove('hidden');
  lucide.createIcons();
}


// --- SUGGESTION BOX & PUBLIC SUGGESTION WALL ---
function setupFeedbackBox() {
  const fForm = document.getElementById('feedback-form');
  if (!fForm) return;

  fForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const subjectVal = document.getElementById('feedback-subject').value.trim();
    const categoryVal = document.getElementById('feedback-category').value;
    const urgencyVal = document.getElementById('feedback-urgency').value;
    const emailVal = document.getElementById('feedback-contact').value.trim() || 'Anonymous';
    const descVal = document.getElementById('feedback-description').value.trim();

    const newSuggestion = {
      id: `sug-${Date.now()}`,
      subject: subjectVal,
      category: categoryVal,
      urgency: urgencyVal,
      desc: descVal,
      status: 'Reviewing',
      date: 'Just now',
      approved: false, // Moderated suggestion
      likes: 0
    };

    dbAddSuggestion(newSuggestion);

    // Reset Form
    fForm.reset();

    // Trigger Toast
    showToast('Suggestion submitted! Admin will check before it goes live.', 'success');
    navigateTo('suggestion-wall');
  });

  if (modalSugCloseBtn) {
    modalSugCloseBtn.addEventListener('click', closeSuggestionModal);
  }
}

function renderSuggestions() {
  const listEl = document.getElementById('feedback-history-list');
  if (!listEl) return;
  listEl.innerHTML = '';

  // Show visitor's own submissions or pending reviewer items
  const visitorItems = suggestions.filter(s => s.status === 'Reviewing' || s.status === 'Added to Queue');
  if (visitorItems.length === 0) {
    listEl.innerHTML = `
      <div class="empty-state" style="max-width:100%; padding:20px; box-shadow:none; border:none; background:transparent; margin:0;">
        <p class="text-muted" style="text-align:center; width:100%;">No pending submissions in queue.</p>
      </div>
    `;
    return;
  }

  visitorItems.forEach(item => {
    let urgencyBadge = `<span class="material-type-tag book">${item.urgency} Priority</span>`;
    if (item.urgency === 'High') {
      urgencyBadge = `<span class="material-type-tag" style="background:rgba(239, 68, 68, 0.15); color:#ef4444;">High Priority</span>`;
    }

    listEl.innerHTML += `
      <div class="material-item-row" style="flex-direction:column; align-items:flex-start; gap:10px; padding:18px;">
        <div style="display:flex; width:100%; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px;">
          <div style="display:flex; align-items:center; gap:10px; flex-wrap:wrap;">
            <strong style="font-size:0.95rem; color:var(--text-main);">${item.subject}</strong>
            <span class="material-type-tag notes" style="font-size:0.65rem;">${item.category}</span>
            ${urgencyBadge}
          </div>
          <span style="font-size:0.75rem; font-weight:600; padding:4px 8px; border-radius:4px; background:rgba(255,255,255,0.05); color:var(--text-muted);">${item.status}</span>
        </div>
        <p style="font-size:0.82rem; color:var(--text-muted); line-height:1.4; margin-top:2px;">${item.desc}</p>
      </div>
    `;
  });
}

function renderSuggestionWall() {
  if (!suggestionWallCanvas) return;
  suggestionWallCanvas.innerHTML = '';

  // Approved suggestions go onto the wall
  const approvedSug = suggestions.filter(s => s.approved);

  if (approvedSug.length === 0) {
    suggestionWallCanvas.innerHTML = `
      <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; height:100%; color:var(--text-muted); font-size:0.85rem; padding:20px; text-align:center; width: 100%;">
        <i data-lucide="message-square" style="width:32px; height:32px; margin-bottom:8px; color:var(--text-dark);"></i>
        <p>No suggestions have been published yet. Be the first to submit a suggestion!</p>
        <button class="primary-btn" onclick="navigateTo('feedback')" style="margin-top:12px;">Write Suggestion</button>
      </div>
    `;
    lucide.createIcons();
    return;
  }

  // Render floating cards
  approvedSug.forEach((item, index) => {
    let urgencyClass = 'book';
    if (item.urgency === 'High') urgencyClass = 'pyq';
    else if (item.urgency === 'Medium') urgencyClass = 'notes';

    const card = document.createElement('div');
    card.className = 'floating-suggestion-card';
    card.id = `floating-${item.id}`;

    const col = index % 2;
    const row = Math.floor(index / 2);

    const left = col * 45 + 5 + Math.random() * 10;
    const top = row * 130 + 20 + Math.random() * 20;

    card.style.left = `${left}%`;
    card.style.top = `${top}px`;
    card.style.animationDelay = `${index * 0.8}s`;

    const hasLiked = sessionLikedSuggestions.includes(item.id) ? 'liked' : '';

    let adminActionBtn = '';
    if (isAdminLoggedIn) {
      adminActionBtn = `
        <button class="secondary-btn" onclick="event.stopPropagation(); removeSuggestion('${item.id}')" style="padding:4px 8px; font-size:0.7rem; border-color:var(--danger); color:var(--danger); display:flex; align-items:center; gap:4px; margin-top:8px; width:max-content;">
          <i data-lucide="trash-2" style="width:12px; height:12px;"></i> Mark Solved & Remove
        </button>
      `;
    }

    card.innerHTML = `
      <div class="floating-experience-card-header">
        <span class="floating-card-tag ${urgencyClass}" style="font-size:0.65rem; margin-bottom:0;">
          ${item.urgency} Priority
        </span>
        <span style="font-size:0.65rem; color:var(--text-dark);">${item.date}</span>
      </div>
      <div class="floating-experience-card-title">${item.subject}</div>
      <div class="floating-experience-card-desc">${item.desc}</div>
      <div style="display:flex; justify-content:space-between; align-items:center; margin-top:10px; flex-wrap:wrap; gap:4px;">
        <span style="font-size:0.65rem; color:var(--text-dark);">${item.category}</span>
        <button class="like-counter-btn ${hasLiked}" onclick="event.stopPropagation(); likeSuggestion('${item.id}', this)" type="button" style="padding:2px 6px;">
          <i data-lucide="heart" style="width:12px; height:12px;"></i>
          <span>${item.likes || 0}</span>
        </button>
      </div>
      ${adminActionBtn}
    `;

    card.addEventListener('click', () => {
      openSuggestionModal(item.id);
    });

    suggestionWallCanvas.appendChild(card);
  });

  lucide.createIcons();
}

function likeSuggestion(sugId, btnElement) {
  const item = suggestions.find(s => s.id === sugId);
  if (!item) return;

  const likedIndex = sessionLikedSuggestions.indexOf(sugId);
  if (likedIndex > -1) {
    // Unlike
    item.likes = Math.max(0, (item.likes || 1) - 1);
    sessionLikedSuggestions.splice(likedIndex, 1);
    btnElement.classList.remove('liked');
    showToast('Removed like from suggestion.', 'info');
  } else {
    // Like
    item.likes = (item.likes || 0) + 1;
    sessionLikedSuggestions.push(sugId);
    btnElement.classList.add('liked');
    showToast('You liked this suggestion!', 'success');
  }

  // Update count text
  btnElement.querySelector('span').textContent = item.likes;

  // Save to database/Firebase
  dbUpdateSuggestion(sugId, { likes: item.likes });
}


// --- CAMPUS SUPPORT STUDENT CARE CENTRE ---
function setupHelpCenter() {
  if (!helpRequestForm) return;

  // Personal Support Form Submission
  helpRequestForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const titleVal = helpTitle.value.trim();
    const categoryVal = helpCategory.value;
    const descVal = helpDescription.value.trim();
    const instaVal = helpInstagram.value.trim();

    const newId = `help-${Date.now()}`;
    const newTicket = {
      id: newId,
      title: titleVal,
      category: categoryVal,
      desc: descVal,
      instagram: instaVal || 'None',
      approved: true, // Auto-approved to database (strictly private)
      date: 'Just now',
      author: 'Anonymous Student',
      chatHistory: [
        { sender: 'visitor', text: `Help requested. Category: ${categoryVal}. Problem details: ${descVal}`, time: 'Just now' }
      ]
    };

    dbAddHelpRequest(newTicket);
    localStorage.setItem('active_care_ticket', newId);

    helpRequestForm.reset();
    showToast('Your counseling request has been sent privately. Use the chat pane below to talk to us.', 'success');
    
    renderVisitorChat();
  });

  // Visitor Chat Message Form Submission
  if (visitorChatForm) {
    visitorChatForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const activeTicketId = localStorage.getItem('active_care_ticket');
      if (!activeTicketId) return;

      const ticket = helpRequests.find(h => h.id === activeTicketId);
      if (!ticket) return;

      const messageText = visitorChatInput.value.trim();
      if (!messageText) return;

      if (!ticket.chatHistory) {
        ticket.chatHistory = [];
      }

      const now = new Date();
      const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      ticket.chatHistory.push({
        sender: 'visitor',
        text: messageText,
        time: timeStr
      });

      // Update in DB
      dbUpdateHelpRequest(activeTicketId, { chatHistory: ticket.chatHistory });
      
      visitorChatInput.value = '';
      renderVisitorChat();
      
      // Update admin panel live if admin is logged in
      if (isAdminLoggedIn) {
        renderAdminQueues();
      }
    });
  }

  // Initial draw
  renderVisitorChat();
}

function renderVisitorChat() {
  const activeTicketId = localStorage.getItem('active_care_ticket');
  if (!activeTicketId) {
    chatActiveSession.classList.add('hidden');
    chatNoSession.classList.remove('hidden');
    chatTicketIdBadge.style.display = 'none';
    return;
  }

  const ticket = helpRequests.find(h => h.id === activeTicketId);
  if (!ticket) {
    // Ticket was probably solved or deleted by admin
    localStorage.removeItem('active_care_ticket');
    chatActiveSession.classList.add('hidden');
    chatNoSession.classList.remove('hidden');
    chatTicketIdBadge.style.display = 'none';
    return;
  }

  // Show active session
  chatActiveSession.classList.remove('hidden');
  chatNoSession.classList.add('hidden');
  
  // Show ticket code
  const ticketCode = ticket.id.substring(ticket.id.length - 6);
  chatTicketIdBadge.textContent = `TICKET: ${ticketCode}`;
  chatTicketIdBadge.style.display = 'inline-block';

  // Render messages
  visitorChatMessages.innerHTML = '';
  const history = ticket.chatHistory || [];
  
  if (history.length === 0) {
    visitorChatMessages.innerHTML = `<div style="text-align:center; color:var(--text-dark); font-size:0.75rem; padding:10px 0;">No messages yet.</div>`;
  } else {
    history.forEach(msg => {
      const bubbleClass = msg.sender === 'visitor' ? 'chat-message-visitor' : 'chat-message-admin';
      visitorChatMessages.innerHTML += `
        <div class="chat-message-row">
          <div class="chat-message-bubble ${bubbleClass}">${msg.text}</div>
          <div class="chat-message-time">${msg.time || 'Just now'}</div>
        </div>
      `;
    });
  }

  // Scroll to bottom
  visitorChatMessages.scrollTop = visitorChatMessages.scrollHeight;
  lucide.createIcons();
}


// --- SECURE ADMIN DASHBOARD & APPROVAL CONTROLS ---
function setupAdminDashboard() {
  // Check session storage for login persistency
  const sessionAuth = sessionStorage.getItem('admin_logged_in') === 'true';
  if (sessionAuth) {
    isAdminLoggedIn = true;
    showAdminDashboardPanel();
  }

  if (adminLoginForm) {
    adminLoginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const user = adminUsername.value.trim();
      const pass = adminPassword.value;

      if (user === 'admin' && pass === 'admin123') {
        isAdminLoggedIn = true;
        sessionStorage.setItem('admin_logged_in', 'true');
        showToast('Authentication successful. System unlock.', 'success');
        showAdminDashboardPanel();
      } else {
        showToast('Invalid administrator credentials.', 'danger');
      }
      adminLoginForm.reset();
    });
  }

  if (adminLogoutBtn) {
    adminLogoutBtn.addEventListener('click', () => {
      isAdminLoggedIn = false;
      sessionStorage.setItem('admin_logged_in', 'false');
      showToast('Logged out of Admin Control Panel.', 'info');
      hideAdminDashboardPanel();
    });
  }

  // Bind Admin Tabs Switcher
  adminTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      adminTabBtns.forEach(b => b.classList.remove('active'));
      adminTabContents.forEach(c => c.style.display = 'none');

      btn.classList.add('active');
      const tabId = `admin-tab-${btn.getAttribute('data-tab')}`;
      document.getElementById(tabId).style.display = 'block';
    });
  });

  setupAdminSearchInspector();

  // Admin chat panel send message form submission
  if (adminChatForm) {
    adminChatForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!selectedAdminTicketId) return;

      const ticket = helpRequests.find(h => h.id === selectedAdminTicketId);
      if (!ticket) return;

      const messageText = adminChatInput.value.trim();
      if (!messageText) return;

      if (!ticket.chatHistory) {
        ticket.chatHistory = [];
      }

      const now = new Date();
      const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      ticket.chatHistory.push({
        sender: 'admin',
        text: messageText,
        time: timeStr
      });

      // Update DB and sync
      dbUpdateHelpRequest(selectedAdminTicketId, { chatHistory: ticket.chatHistory });

      adminChatInput.value = '';
      renderAdminQueues();
      
      // Update visitor's view live if active
      renderVisitorChat();
    });
  }

  // Admin close/archive ticket button
  if (adminCloseTicketBtn) {
    adminCloseTicketBtn.addEventListener('click', () => {
      if (!selectedAdminTicketId) return;
      
      dbDeleteHelpRequest(selectedAdminTicketId);
      showToast("Care support ticket solved and archived.", "success");
      
      selectedAdminTicketId = null;
      renderAdminQueues();
      renderVisitorChat();
    });
  }
}

function showAdminDashboardPanel() {
  adminLoginCard.classList.add('hidden');
  adminDashboardPanel.classList.remove('hidden');
  
  // Update footer profile
  const profileSection = document.getElementById('user-profile-section');
  if (profileSection) {
    profileSection.querySelector('.avatar').textContent = 'AD';
    profileSection.querySelector('.avatar').style.background = 'linear-gradient(135deg, #f59e0b, #ef4444)';
    profileSection.querySelector('.user-name').textContent = 'System Admin';
    profileSection.querySelector('.user-role').textContent = 'Portal Moderator';
  }

  // Refresh admin tables
  renderAdminQueues();
}

function hideAdminDashboardPanel() {
  adminLoginCard.classList.remove('hidden');
  adminDashboardPanel.classList.add('hidden');

  // Reset footer profile
  const profileSection = document.getElementById('user-profile-section');
  if (profileSection) {
    profileSection.querySelector('.avatar').textContent = 'VS';
    profileSection.querySelector('.avatar').style.background = 'linear-gradient(135deg, #4f46e5, #ec4899)';
    profileSection.querySelector('.user-name').textContent = 'Guest Student';
    profileSection.querySelector('.user-role').textContent = 'College Visitor';
  }
}

function renderAdminQueues() {
  if (!isAdminLoggedIn) return;

  // Overview stats card updates
  const pendingMatCount = materials.filter(m => !m.approved).length;
  const pendingSugCount = suggestions.filter(s => !s.approved).length;
  const activeHelpCount = helpRequests.length;
  const pendingExpCount = seniorExperiences.filter(e => !e.approved).length;

  if (adminStatMaterialsCount) adminStatMaterialsCount.textContent = pendingMatCount;
  if (adminStatSugCount) adminStatSugCount.textContent = pendingSugCount;
  if (adminStatHelpCount) adminStatHelpCount.textContent = activeHelpCount;
  if (adminStatExpCount) adminStatExpCount.textContent = pendingExpCount;

  // Tab badge counts
  if (adminPendingMaterialsCount) adminPendingMaterialsCount.textContent = pendingMatCount;
  if (adminPendingSugCount) adminPendingSugCount.textContent = suggestions.length; // total suggestions
  if (adminHelpCount) adminHelpCount.textContent = activeHelpCount;
  if (adminPendingExpCount) adminPendingExpCount.textContent = pendingExpCount;

  // Pending materials
  const pendingMat = materials.filter(m => !m.approved);
  adminMaterialsTableBody.innerHTML = '';
  if (pendingMat.length === 0) {
    adminMaterialsTableBody.innerHTML = `<tr><td colspan="5" style="text-align:center; padding:20px; color:var(--text-dark);">No pending document uploads.</td></tr>`;
  } else {
    pendingMat.forEach(m => {
      adminMaterialsTableBody.innerHTML += `
        <tr style="border-bottom:1px solid var(--border-color);">
          <td style="padding:12px 8px; font-weight:600;">${m.title}</td>
          <td style="padding:12px 8px;"><span class="material-type-tag ${m.category}">${m.category}</span></td>
          <td style="padding:12px 8px;">${m.subjectCode}</td>
          <td style="padding:12px 8px;">
            <div class="btn-row">
              <button class="secondary-btn" onclick="openPreviewModal('${m.id}')">Preview</button>
              <button class="primary-btn" onclick="approveMaterial('${m.id}')" style="background:#10b981;">Approve</button>
              <button class="secondary-btn" onclick="rejectMaterial('${m.id}')" style="border-color:var(--danger); color:var(--danger);">Reject</button>
            </div>
          </td>
        </tr>
      `;
    });
  }

  // Suggestions moderation
  adminSuggestionsTableBody.innerHTML = '';
  if (suggestions.length === 0) {
    adminSuggestionsTableBody.innerHTML = `<tr><td colspan="5" style="text-align:center; padding:20px; color:var(--text-dark);">No suggestions submitted.</td></tr>`;
  } else {
    suggestions.forEach(s => {
      const statusBadge = s.approved 
        ? `<span class="badge" style="background:rgba(16,185,129,0.15); color:var(--success);">Wall Active</span>`
        : `<span class="badge" style="background:rgba(245,158,11,0.15); color:var(--accent);">Pending review</span>`;

      let actionBtns = '';
      if (!s.approved) {
        actionBtns = `
          <button class="primary-btn" onclick="approveSuggestion('${s.id}')" style="background:#10b981;">Approve to Wall</button>
          <button class="secondary-btn" onclick="removeSuggestion('${s.id}')" style="border-color:var(--danger); color:var(--danger);">Delete</button>
        `;
      } else {
        actionBtns = `
          <button class="secondary-btn" onclick="removeSuggestion('${s.id}')" style="border-color:var(--danger); color:var(--danger);">Solve & Remove</button>
        `;
      }

      adminSuggestionsTableBody.innerHTML += `
        <tr style="border-bottom:1px solid var(--border-color);">
          <td style="padding:12px 8px; font-weight:600;">${s.subject}</td>
          <td style="padding:12px 8px;">${s.urgency}</td>
          <td style="padding:12px 8px;">${statusBadge}</td>
          <td style="padding:12px 8px; color:var(--text-muted); max-width:200px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${s.desc}</td>
          <td style="padding:12px 8px;">
            <div class="btn-row">${actionBtns}</div>
          </td>
        </tr>
      `;
    });
  }

  // Senior Placements Wisdom queue
  if (adminExperiencesTableBody) {
    adminExperiencesTableBody.innerHTML = '';
    if (seniorExperiences.length === 0) {
      adminExperiencesTableBody.innerHTML = `<tr><td colspan="5" style="text-align:center; padding:20px; color:var(--text-dark);">No senior placement reviews found.</td></tr>`;
    } else {
      seniorExperiences.forEach(exp => {
        const statusBadge = exp.approved 
          ? `<span class="badge" style="background:rgba(16,185,129,0.15); color:var(--success);">Public Wall</span>`
          : `<span class="badge" style="background:rgba(245,158,11,0.15); color:var(--accent);">Moderation Pending</span>`;

        let actionBtns = '';
        if (!exp.approved) {
          actionBtns = `
            <button class="primary-btn" onclick="approveExperience('${exp.id}')" style="background:#10b981;">Approve & Publish</button>
            <button class="secondary-btn" onclick="rejectExperience('${exp.id}')" style="border-color:var(--danger); color:var(--danger);">Reject</button>
          `;
        } else {
          actionBtns = `
            <button class="secondary-btn" onclick="rejectExperience('${exp.id}')" style="border-color:var(--danger); color:var(--danger);">Delete Post</button>
          `;
        }

        adminExperiencesTableBody.innerHTML += `
          <tr style="border-bottom:1px solid var(--border-color);">
            <td style="padding:12px 8px; font-weight:600;">${exp.title}</td>
            <td style="padding:12px 8px;">${exp.company}</td>
            <td style="padding:12px 8px;">${statusBadge}</td>
            <td style="padding:12px 8px;">
              <div class="btn-row">${actionBtns}</div>
            </td>
          </tr>
        `;
      });
    }
  }

  // Student Care Centre tickets list & chat loading
  adminHelpCount.textContent = helpRequests.length;
  adminCareTicketsList.innerHTML = '';
  
  if (helpRequests.length === 0) {
    adminCareTicketsList.innerHTML = `<div style="text-align:center; padding:24px 10px; color:var(--text-dark); font-size:0.8rem; width:100%;">No active care tickets.</div>`;
    selectedAdminTicketId = null;
    renderAdminCareChatConsole(null);
  } else {
    // Select first ticket if none active or current active deleted
    if (!selectedAdminTicketId || !helpRequests.some(h => h.id === selectedAdminTicketId)) {
      selectedAdminTicketId = helpRequests[0].id;
    }

    helpRequests.forEach(h => {
      const isActiveClass = h.id === selectedAdminTicketId ? 'active' : '';
      const ticketCode = h.id.substring(h.id.length - 6);
      const isUnread = h.chatHistory && h.chatHistory.length > 0 && h.chatHistory[h.chatHistory.length - 1].sender === 'visitor';
      const unreadIndicator = isUnread ? `<span class="badge" style="background:#ef4444; color:white; font-size:0.58rem; padding:1px 4px; border-radius:3px; margin-left:6px; height:max-content;">New</span>` : '';

      const card = document.createElement('div');
      card.className = `care-ticket-card ${isActiveClass}`;
      card.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <div class="care-ticket-card-title">${h.title}</div>
          ${unreadIndicator}
        </div>
        <div class="care-ticket-card-meta">
          <span>#${ticketCode} • Mood: ${h.category}</span>
        </div>
      `;
      card.addEventListener('click', () => {
        selectedAdminTicketId = h.id;
        renderAdminQueues();
      });
      adminCareTicketsList.appendChild(card);
    });

    renderAdminCareChatConsole(selectedAdminTicketId);
  }

  lucide.createIcons();
}

function renderAdminCareChatConsole(ticketId) {
  if (!ticketId) {
    adminCareChatActive.classList.add('hidden');
    adminCareChatEmpty.classList.remove('hidden');
    return;
  }

  const ticket = helpRequests.find(h => h.id === ticketId);
  if (!ticket) {
    adminCareChatActive.classList.add('hidden');
    adminCareChatEmpty.classList.remove('hidden');
    return;
  }

  adminCareChatActive.classList.remove('hidden');
  adminCareChatEmpty.classList.add('hidden');

  const ticketCode = ticket.id.substring(ticket.id.length - 6);
  adminChatTicketTitle.textContent = `Ticket: #${ticketCode} - "${ticket.title}"`;
  adminChatTicketMood.textContent = `Mood: ${ticket.category}`;
  
  if (ticket.instagram && ticket.instagram !== 'None' && ticket.instagram !== '@None') {
    const handle = ticket.instagram.replace('@', '');
    adminChatTicketInstagram.textContent = `@${handle}`;
    adminChatTicketInstagram.href = `https://instagram.com/${handle}`;
    adminChatTicketInstagram.style.display = 'inline-flex';
  } else {
    adminChatTicketInstagram.textContent = 'Not provided';
    adminChatTicketInstagram.removeAttribute('href');
  }

  adminChatTicketDesc.textContent = ticket.desc;

  // Render chat messages
  adminChatMessages.innerHTML = '';
  const history = ticket.chatHistory || [];
  
  if (history.length === 0) {
    adminChatMessages.innerHTML = `<div style="text-align:center; color:var(--text-dark); font-size:0.75rem; padding:10px 0;">No message history.</div>`;
  } else {
    history.forEach(msg => {
      const bubbleClass = msg.sender === 'admin' ? 'chat-message-visitor' : 'chat-message-admin';
      adminChatMessages.innerHTML += `
        <div class="chat-message-row">
          <div class="chat-message-bubble ${bubbleClass}">${msg.text}</div>
          <div class="chat-message-time">${msg.time || 'Just now'}</div>
        </div>
      `;
    });
  }

  adminChatMessages.scrollTop = adminChatMessages.scrollHeight;
}

function renderAdminDashboard() {
  if (isAdminLoggedIn) {
    showAdminDashboardPanel();
  } else {
    hideAdminDashboardPanel();
  }
}

// Moderation Action Controllers
function approveMaterial(matId) {
  dbUpdateMaterial(matId, { approved: true });
  showToast("Material approved! Available online now.", "success");
  
  // Notify user & redraw dashboard stats
  const item = materials.find(m => m.id === matId);
  if (item) {
    const newNotif = {
      id: `notif-${Date.now()}`,
      text: `User material "${item.title}" approved and live in database.`,
      time: 'Just now',
      type: 'uploaded',
      unread: true
    };
    notifications.unshift(newNotif);
    saveDatabase();
    updateNotificationsBadge();
  }
  
  renderAdminQueues();
}

function rejectMaterial(matId) {
  dbDeleteMaterial(matId);
  showToast("Material upload request rejected.", "warning");
  renderAdminQueues();
}

function approveSuggestion(sugId) {
  dbUpdateSuggestion(sugId, { approved: true, status: 'Added to Queue' });
  showToast("Suggestion approved to public wall.", "success");
  renderAdminQueues();
}

function removeSuggestion(sugId) {
  dbDeleteSuggestion(sugId);
  showToast("Suggestion resolved and removed from wall.", "info");
  
  // Reload Suggestion wall if currently on it
  if (window.location.hash === '#suggestion-wall') {
    renderSuggestionWall();
  }
  renderAdminQueues();
}

function removeHelpRequest(helpId) {
  dbDeleteHelpRequest(helpId);
  showToast("Care support ticket resolved & archived.", "info");
  renderAdminQueues();
}

// Dynamic routing execution helper
function renderHelpCenter() {
  renderVisitorChat();
}

function approveExperience(expId) {
  dbUpdateSeniorExperience(expId, { approved: true });
  showToast("Placement experience approved & live!", "success");
  
  const item = seniorExperiences.find(e => e.id === expId);
  if (item) {
    const newNotif = {
      id: `notif-${Date.now()}`,
      text: `New Senior Experience "${item.title}" approved.`,
      time: 'Just now',
      type: 'uploaded',
      unread: true
    };
    notifications.unshift(newNotif);
    saveDatabase();
    updateNotificationsBadge();
  }
  renderAdminQueues();
  
  if (window.location.hash === '#senior-experiences') {
    renderSeniorExperiences();
  }
}

function rejectExperience(expId) {
  dbDeleteSeniorExperience(expId);
  showToast("Placement experience request rejected.", "warning");
  renderAdminQueues();
  
  if (window.location.hash === '#senior-experiences') {
    renderSeniorExperiences();
  }
}

// --- SENIOR EXPERIENCES LOGIC ---
function setupSeniorExperiences() {
  if (seniorExperienceForm) {
    seniorExperienceForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const newExp = {
        id: 'exp-' + Date.now(),
        title: expTitle.value.trim(),
        name: 'Anonymous',
        company: expCompany.value.trim(),
        desc: expContent.value.trim(),
        contact: expContact.value.trim() || null,
        approved: false,
        date: 'Just now'
      };
      
      dbAddSeniorExperience(newExp);
      seniorExperienceForm.reset();
      
      showToast('Advice submitted for review!');
      
      createNotification(
        'New Senior Experience Review',
        `"${newExp.title}" submitted by ${newExp.name} requires verification.`,
        'admin'
      );
      
      renderSeniorExperiences();
    });
  }
  
  if (modalExpCloseBtn) {
    modalExpCloseBtn.addEventListener('click', closeExperienceModal);
  }
}

function renderSeniorExperiences() {
  if (!experiencesCanvas) return;
  experiencesCanvas.innerHTML = '';
  
  const approvedExps = seniorExperiences.filter(e => e.approved);
  
  if (approvedExps.length === 0) {
    experiencesCanvas.innerHTML = `
      <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; height:100%; color:var(--text-muted); font-size:0.85rem; padding:20px; text-align:center; width: 100%;">
        <i data-lucide="award" style="width:32px; height:32px; margin-bottom:8px; color:var(--text-dark);"></i>
        <p>No senior wisdom shared yet. Be the first to share your college placements and tips!</p>
      </div>
    `;
    lucide.createIcons();
    return;
  }
  
  // Render floating cards
  approvedExps.forEach((exp, index) => {
    const card = document.createElement('div');
    card.className = 'floating-experience-card';
    card.id = `floating-${exp.id}`;
    
    const col = index % 2;
    const row = Math.floor(index / 2);
    
    const left = col * 45 + 5 + Math.random() * 10;
    const top = row * 130 + 20 + Math.random() * 20;
    
    card.style.left = `${left}%`;
    card.style.top = `${top}px`;
    card.style.animationDelay = `${index * 0.8}s`;
    
    card.innerHTML = `
      <div class="floating-experience-card-header">
        <span class="floating-card-tag" style="background:var(--primary-glow); color:var(--primary); font-size:0.65rem; margin-bottom:0; max-width:145px; text-overflow:ellipsis; overflow:hidden; white-space:nowrap;">
          ${exp.company}
        </span>
        <span style="font-size:0.65rem; color:var(--text-dark);">${exp.date}</span>
      </div>
      <div class="floating-experience-card-title">${exp.title}</div>
      <div class="floating-experience-card-desc">${exp.desc}</div>
      <div class="floating-experience-card-author" style="justify-content: flex-end;">
        <i data-lucide="zoom-in" style="width:12px; height:12px;"></i>
      </div>
    `;
    
    card.addEventListener('click', () => {
      openExperienceModal(exp.id);
    });
    
    experiencesCanvas.appendChild(card);
  });
  
  lucide.createIcons();
}

function openExperienceModal(expId) {
  const exp = seniorExperiences.find(e => e.id === expId);
  if (!exp) return;
  
  modalExpTitle.textContent = exp.title;
  modalExpCompany.textContent = exp.company;
  modalExpContent.textContent = exp.desc;
  
  experienceModal.classList.remove('hidden');
}

function closeExperienceModal() {
  experienceModal.classList.add('hidden');
}

// --- ADMIN SEARCH INSPECTOR ---
function setupAdminSearchInspector() {
  if (adminSearchBtn && adminSearchInput) {
    const handleSearch = () => {
      const query = adminSearchInput.value.trim().toLowerCase();
      if (!query) {
        adminSearchResultsBox.innerHTML = '';
        adminSearchResultsBox.classList.add('hidden');
        return;
      }
      
      const results = [];
      
      // 1. Search Materials
      materials.forEach(m => {
        if (m.title.toLowerCase().includes(query) || 
            m.subjectCode.toLowerCase().includes(query) || 
            m.author.toLowerCase().includes(query) || 
            (m.description && m.description.toLowerCase().includes(query))) {
          results.push({ type: 'Material', title: m.title, subtitle: `${m.subjectCode}`, approved: m.approved, action: () => {
            if (!m.approved) {
              approveMaterial(m.id);
            } else {
              rejectMaterial(m.id);
            }
            handleSearch();
          }});
        }
      });
      
      // 2. Search Suggestions
      suggestions.forEach(s => {
        if ((s.subject && s.subject.toLowerCase().includes(query)) || 
            (s.category && s.category.toLowerCase().includes(query)) || 
            (s.desc && s.desc.toLowerCase().includes(query))) {
          results.push({ type: 'Suggestion', title: s.subject, subtitle: `${s.category} [${s.urgency}]`, approved: s.approved, action: () => {
            if (!s.approved) {
              approveSuggestion(s.id);
            } else {
              removeSuggestion(s.id);
            }
            handleSearch();
          }});
        }
      });
      
      // 3. Search Care Tickets
      helpRequests.forEach(h => {
        if (h.title.toLowerCase().includes(query) || 
            h.category.toLowerCase().includes(query) || 
            (h.desc && h.desc.toLowerCase().includes(query))) {
          results.push({ type: 'Care Ticket', title: h.title, subtitle: `Mood: ${h.category}`, approved: true, action: () => {
            removeHelpRequest(h.id);
            handleSearch();
          }});
        }
      });
      
      // 4. Search Placement Experiences
      seniorExperiences.forEach(e => {
        if (e.title.toLowerCase().includes(query) || 
            e.company.toLowerCase().includes(query) || 
            e.desc.toLowerCase().includes(query) || 
            e.name.toLowerCase().includes(query)) {
          results.push({ type: 'Wisdom Post', title: e.title, subtitle: `${e.company}`, approved: e.approved, action: () => {
            if (!e.approved) {
              approveExperience(e.id);
            } else {
              rejectExperience(e.id);
            }
            handleSearch();
          }});
        }
      });
      
      adminSearchResultsBox.classList.remove('hidden');
      if (results.length === 0) {
        adminSearchResultsBox.innerHTML = '<div style="font-size:0.8rem; color:var(--text-muted);">No records match your query.</div>';
        return;
      }
      
      adminSearchResultsBox.innerHTML = '';
      results.forEach(res => {
        const row = document.createElement('div');
        row.className = 'admin-inspector-row';
        row.innerHTML = `
          <div class="admin-inspector-info">
            <span style="font-size:0.6rem; text-transform:uppercase; color:var(--primary); font-weight:700;">${res.type}</span>
            <span style="font-weight:700; color:var(--text-main);">${res.title}</span>
            <span style="font-size:0.7rem; color:var(--text-muted);">${res.subtitle}</span>
          </div>
          <div class="admin-inspector-actions">
            <button class="primary-btn" style="padding:4px 8px; font-size:0.7rem;">
              ${res.approved ? '<i data-lucide="trash-2"></i> Delete' : '<i data-lucide="check"></i> Approve'}
            </button>
          </div>
        `;
        row.querySelector('button').addEventListener('click', res.action);
        adminSearchResultsBox.appendChild(row);
      });
      lucide.createIcons();
    };
    
    adminSearchBtn.addEventListener('click', handleSearch);
    adminSearchInput.addEventListener('keyup', (e) => {
      if (e.key === 'Enter') handleSearch();
    });
  }
}

function openSuggestionModal(sugId) {
  const sug = suggestions.find(s => s.id === sugId);
  if (!sug) return;

  modalSugTitle.textContent = sug.subject;
  modalSugCategory.textContent = sug.category;
  modalSugUrgency.textContent = sug.urgency + ' Priority';
  modalSugContent.textContent = sug.desc;
  modalSugMeta.textContent = `Submitted: ${sug.date}`;
  modalSugLikesCount.textContent = sug.likes || 0;

  const hasLiked = sessionLikedSuggestions.includes(sug.id) ? 'liked' : '';
  if (hasLiked) {
    modalSugLikeBtn.classList.add('liked');
  } else {
    modalSugLikeBtn.classList.remove('liked');
  }

  // Bind the like action in the modal
  modalSugLikeBtn.onclick = () => {
    likeSuggestion(sug.id, modalSugLikeBtn);
    const updated = suggestions.find(s => s.id === sugId);
    modalSugLikesCount.textContent = updated.likes || 0;
    renderSuggestionWall();
  };

  suggestionDetailModal.classList.remove('hidden');
}

function closeSuggestionModal() {
  suggestionDetailModal.classList.add('hidden');
}

// Initialize Dynamic Loaders
await loadDatabase();

async function seedFirestore() {
    for (const item of DEFAULT_SUBJECTS) {
        await addDocument("subjects", item);
    }

    for (const item of DEFAULT_MATERIALS) {
        await addDocument("materials", item);
    }

    for (const item of DEFAULT_SUGGESTIONS) {
        await addDocument("suggestions", item);
    }

    for (const item of DEFAULT_HELP_REQUESTS) {
        await addDocument("helpRequests", item);
    }

    for (const item of DEFAULT_EXPERIENCES) {
        await addDocument("experiences", item);
    }

    console.log("Firestore seeded successfully.");
}
// seedFirestore();
// ===== Expose functions for inline HTML onclick =====

window.navigateTo = navigateTo;
window.quickFilter = quickFilter;

window.setExplorerSemFilter = setExplorerSemFilter;
window.setExplorerDeptFilter = setExplorerDeptFilter;

window.openPreviewModal = openPreviewModal;
window.openSubjectDetail = openSubjectDetail;

window.toggleBookmark = toggleBookmark;
window.markNotifRead = markNotifRead;

window.likeSuggestion = likeSuggestion;

window.removeSuggestion = removeSuggestion;

window.approveMaterial = approveMaterial;
window.rejectMaterial = rejectMaterial;

window.approveSuggestion = approveSuggestion;

window.approveExperience = approveExperience;
window.rejectExperience = rejectExperience;