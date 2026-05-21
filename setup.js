// ============================================
// LA PROVIDENCE - INITIAL SETUP SCRIPT
// ============================================
// Run this once in browser console to set up default users
// Or include this script temporarily on any page

// Firebase is already initialized on the page
// This script sets up default admin and reception accounts

function initializeSystem() {
    const db = firebase.database();

    // Default Admin
    const defaultAdmin = {
        username: "admin",
        password: "admin123",
        name: "System Admin"
    };

    // Default Reception
    const defaultReception = {
        username: "reception",
        password: "rec123",
        name: "Reception Desk"
    };

    // Default Settings
    const defaultSettings = {
        counter: 1,
        activeDoctors: []
    };

    // Check if already initialized
    db.ref('users/admin').once('value').then(snap => {
        if (!snap.exists()) {
            // Create admin
            db.ref('users/admin').set(defaultAdmin).then(() => {
                console.log('✅ Admin created: username=admin, password=admin123');
            });
        } else {
            console.log('ℹ️ Admin already exists');
        }
    });

    db.ref('users/reception').once('value').then(snap => {
        if (!snap.exists()) {
            // Create reception
            db.ref('users/reception').set(defaultReception).then(() => {
                console.log('✅ Reception created: username=reception, password=rec123');
            });
        } else {
            console.log('ℹ️ Reception already exists');
        }
    });

    db.ref('settings').once('value').then(snap => {
        if (!snap.exists()) {
            // Create settings
            db.ref('settings').set(defaultSettings).then(() => {
                console.log('✅ Settings initialized');
            });
        } else {
            console.log('ℹ️ Settings already exist');
        }
    });

    console.log('🚀 System initialization complete!');
    console.log('');
    console.log('📋 DEFAULT CREDENTIALS:');
    console.log('   Admin:      username=admin      password=admin123');
    console.log('   Reception:  username=reception  password=rec123');
    console.log('');
    console.log('⚠️  IMPORTANT: Change these passwords after first login!');
}

// Auto-run if Firebase is ready
if (typeof firebase !== 'undefined') {
    initializeSystem();
} else {
    console.error('❌ Firebase not loaded. Make sure firebase-app-compat.js is loaded first.');
}
