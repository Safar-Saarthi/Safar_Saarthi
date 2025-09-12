import { db } from "./db";
import { safetyTips, safetyAlerts, emergencyContacts } from "@shared/schema";

async function seedDatabase() {
  console.log("Starting database seeding...");

  try {
    // Seed safety tips
    console.log("Seeding safety tips...");
    const safetyTipsData = [
      {
        title: "Always Stay Alert in Crowded Areas",
        content: "Keep your belongings secure and be aware of your surroundings, especially in tourist hotspots. Pickpockets often target distracted visitors.",
        category: "General Safety",
        priority: "high"
      },
      {
        title: "Share Your Location with Trusted Contacts",
        content: "Always inform family or friends about your travel plans and current location. Use location sharing features when exploring unfamiliar areas.",
        category: "Communication",
        priority: "high"
      },
      {
        title: "Keep Emergency Numbers Handy",
        content: "Save local emergency numbers, embassy contacts, and tourist helpline numbers in your phone. Know the universal emergency number (112) for most countries.",
        category: "Emergency Prep",
        priority: "critical"
      },
      {
        title: "Research Local Safety Conditions",
        content: "Before visiting any destination, research current safety conditions, common scams, and areas to avoid, especially during certain times of day.",
        category: "Travel Planning",
        priority: "medium"
      },
      {
        title: "Avoid Displaying Expensive Items",
        content: "Keep jewelry, expensive electronics, and large amounts of cash hidden. Use hotel safes for valuables and consider using a money belt.",
        category: "General Safety",
        priority: "high"
      },
      {
        title: "Plan Your Return Route",
        content: "Always have a plan for getting back to your accommodation safely, especially when going out at night. Know public transport schedules and taxi options.",
        category: "Travel Planning",
        priority: "medium"
      },
      {
        title: "Stay Hydrated and Healthy",
        content: "Carry water, avoid tap water in certain areas, and be cautious about street food. Know the location of nearby hospitals and clinics.",
        category: "Health & Wellness",
        priority: "medium"
      },
      {
        title: "Use Reputable Transportation",
        content: "Use licensed taxis, official ride-sharing apps, or reputable tour operators. Avoid unmarked vehicles or offers from strangers.",
        category: "Transportation",
        priority: "high"
      },
      {
        title: "Keep Digital and Physical Copies",
        content: "Make copies of your passport, ID, insurance, and important documents. Store them separately and keep digital copies in secure cloud storage.",
        category: "Documentation",
        priority: "critical"
      },
      {
        title: "Trust Your Instincts",
        content: "If a situation or person makes you feel uncomfortable, trust your gut feeling and remove yourself from the situation immediately.",
        category: "General Safety",
        priority: "critical"
      }
    ];

    await db.insert(safetyTips).values(safetyTipsData);

    // Seed safety alerts  
    console.log("Seeding safety alerts...");
    const safetyAlertsData = [
      {
        title: "Heavy Rainfall Expected in City Center", 
        message: "Monsoon rains expected to cause flooding in low-lying areas. Avoid travel near rivers and use covered transportation.",
        severity: "medium",
        location: "New Delhi City Center",
        latitude: "28.6139",
        longitude: "77.2090"
      },
      {
        title: "Avoid XYZ Street After 8 PM",
        message: "Increased criminal activity reported after dark. Police patrols increased but visitors advised to use alternate routes.",
        severity: "high", 
        location: "XYZ Street, Tourist District",
        latitude: "28.6165",
        longitude: "77.2088"
      },
      {
        title: "Pickpocket Activity Near India Gate",
        message: "Multiple reports of pickpocketing incidents near India Gate monument. Keep valuables secure and remain vigilant.",
        severity: "medium",
        location: "India Gate Area",
        latitude: "28.6129",
        longitude: "77.2295"
      },
      {
        title: "Road Construction - Traffic Delays",
        message: "Major road construction causing significant delays on NH-44. Allow extra travel time and consider alternate routes.",
        severity: "low",
        location: "National Highway 44",
        latitude: "28.5355",
        longitude: "77.3910"
      },
      {
        title: "Tourist Scam Alert - Fake Police",
        message: "Reports of criminals posing as police officers targeting tourists. Always ask for official identification and report suspicious behavior.",
        severity: "high",
        location: "Connaught Place Area", 
        latitude: "28.6315",
        longitude: "77.2167"
      }
    ];

    await db.insert(safetyAlerts).values(safetyAlertsData);

    // Seed emergency contacts
    console.log("Seeding emergency contacts...");
    const emergencyContactsData = [
      {
        name: "Delhi Police Emergency",
        phoneNumber: "100",
        type: "police",
        location: "New Delhi Police Headquarters",
        latitude: "28.6139",
        longitude: "77.2090"
      },
      {
        name: "All India Institute of Medical Sciences",
        phoneNumber: "+91-11-26588500", 
        type: "hospital",
        location: "AIIMS, Ansari Nagar",
        latitude: "28.5672",
        longitude: "77.2100"
      },
      {
        name: "Tourist Helpline Delhi",
        phoneNumber: "1363",
        type: "tourist_support",
        location: "Delhi Tourism Office",
        latitude: "28.6139",
        longitude: "77.2090"
      },
      {
        name: "Delhi Fire Service",
        phoneNumber: "101", 
        type: "fire_department",
        location: "Delhi Fire Department HQ",
        latitude: "28.6500",
        longitude: "77.2300"
      },
      {
        name: "Embassy of United States",
        phoneNumber: "+91-11-2419-8000",
        type: "embassy",
        location: "Chanakyapuri, New Delhi",
        latitude: "28.5984",
        longitude: "77.1892"
      },
      {
        name: "Embassy of United Kingdom",
        phoneNumber: "+91-11-2419-2100", 
        type: "embassy",
        location: "Chanakyapuri, New Delhi",
        latitude: "28.5950",
        longitude: "77.1905"
      },
      {
        name: "Tourist Police Booth - India Gate",
        phoneNumber: "+91-11-2301-4050",
        type: "tourist_police",
        location: "India Gate, Rajpath",
        latitude: "28.6129",
        longitude: "77.2295"
      },
      {
        name: "Indira Gandhi International Airport Security",
        phoneNumber: "+91-11-2567-5126",
        type: "airport_security", 
        location: "IGI Airport, Terminal 3",
        latitude: "28.5562",
        longitude: "77.0999"
      }
    ];

    await db.insert(emergencyContacts).values(emergencyContactsData);

    console.log("Database seeded successfully!");
    console.log(`- ${safetyTipsData.length} safety tips added`);
    console.log(`- ${safetyAlertsData.length} safety alerts added`); 
    console.log(`- ${emergencyContactsData.length} emergency contacts added`);

  } catch (error) {
    console.error("Error seeding database:", error);
    throw error;
  }
}

// Run the seed function
seedDatabase()
  .then(() => {
    console.log("Seeding completed successfully");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Seeding failed:", error);
    process.exit(1);
  });