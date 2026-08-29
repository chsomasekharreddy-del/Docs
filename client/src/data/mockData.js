export const initialUserProfile = {
  name: "Alex Taylor",
  email: "alex.taylor@doc.ai",
  tier: "Doc.ai Plus • Pro Plan",
  memberSince: "January 2024",
  stats: {
    consultations: 24,
    savedInsights: 8,
    healthStreak: 12,
    topicsExplored: 14,
  },
  vitals: {
    bloodGroup: "O Positive (O+)",
    restingHeartRate: "68 bpm",
    bloodPressure: "118 / 76 mmHg",
    oxygenSaturation: "99% SpO2",
    bmi: "22.4 (Healthy)",
    allergies: ["Penicillin", "Latex", "Pollen"],
  },
  emergencyContact: {
    name: "Elena Taylor",
    relationship: "Spouse",
    phone: "+1 (555) 234-8901",
  }
};

export const suggestionPrompts = [
  {
    id: "sugg-1",
    icon: "Brain",
    title: "Persistent Tension Headache",
    subtitle: "Dull ache across temples after 8+ hours screen time",
    query: "I have a persistent dull headache across both temples after working on my computer all day. My eyes feel strained.",
    tag: "Neurology",
  },
  {
    id: "sugg-2",
    icon: "Moon",
    title: "Sleep Quality & Restlessness",
    subtitle: "Waking up exhausted despite 7 hours in bed",
    query: "I wake up multiple times during the night and feel fatigued in the mornings even after 7-8 hours in bed. What could be causing this?",
    tag: "Sleep Science",
  },
  {
    id: "sugg-3",
    icon: "Activity",
    title: "Post-Exercise Muscle Soreness",
    subtitle: "Stiff quadriceps and joint tightness after HIIT",
    query: "I did an intense leg workout 2 days ago and my muscles are extremely sore and stiff. How can I speed up DOMS recovery?",
    tag: "Fitness & Recovery",
  },
  {
    id: "sugg-4",
    icon: "ShieldAlert",
    title: "Seasonal Allergy Symptoms",
    subtitle: "Sneezing, watery eyes, and clear nasal discharge",
    query: "I have continuous sneezing, itchy watery eyes, and a clear runny nose whenever I go outdoors in the morning.",
    tag: "Immunology",
  }
];

export const initialConversations = [
  {
    id: "1",
    title: "Tension Headache & Screen Fatigue",
    lastMessage: "Consider the 20-20-20 rule and ergonomic display adjustments.",
    timestamp: "2 hours ago",
    symptoms: ["Bilateral temporal pressure", "Eye strain", "Neck tightness"],
    keywords: ["Screen time", "Ergonomics", "Hydration", "Blue light"],
    metrics: {
      factorScores: [
        { name: "Dehydration Factor", value: 72, color: "#14b8a6" },
        { name: "Digital Eye Strain", value: 88, color: "#06b6d4" },
        { name: "Cervical Posture", value: 65, color: "#6366f1" },
        { name: "Sleep Deficit", value: 40, color: "#f59e0b" },
      ]
    },
    messages: [
      {
        id: "m-1-1",
        sender: "user",
        timestamp: "10:14 AM",
        text: "I have a dull, band-like headache around my forehead and temples. It gets worse after staring at my monitor all afternoon.",
      },
      {
        id: "m-1-2",
        sender: "assistant",
        timestamp: "10:15 AM",
        insight: {
          topic: "Tension-Type Headache Associated with Digital Eye Strain",
          causes: [
            { title: "Digital Asthenopia (Eye Strain)", badge: "High Correlation", desc: "Prolonged ciliary muscle contraction from fixed-distance screen viewing." },
            { title: "Cervicogenic Muscle Tension", badge: "Moderate Correlation", desc: "Suboccipital neck muscle contraction from forward head posture ('tech neck')." },
            { title: "Subclinical Dehydration", badge: "Common Trigger", desc: "Mild fluid deficit reducing intracranial perivascular compliance." }
          ],
          symptoms: [
            "Bilateral, non-pulsating dull pressure around forehead/temples",
            "Sensation of heavy or dry eyelids",
            "Mild stiffness radiating from cervical spine into upper shoulders"
          ],
          info: [
            "Tension headaches are the most frequent primary headache disorder, affecting over 70% of digital workers.",
            "Visual blue-light exposure combined with reduced blink rate (from 18/min to ~5/min) drastically increases corneal dry spots.",
            "Avoid excessive OTC analgesic overuse (NSAIDs) to prevent rebound medication-adaptation headaches."
          ],
          nextStep: {
            action: "Practice the 20-20-20 rule, rehydrate with 500ml water containing electrolytes, and dim screen luminance. Seek immediate medical evaluation if accompanied by sudden visual loss, fever, or vomiting.",
            urgency: "Routine / Self-Care",
            consultSpecialist: "Optometrist or Primary Care Physician"
          }
        }
      }
    ]
  },
  {
    id: "2",
    title: "Post-Workout Recovery & Hydration",
    lastMessage: "Electrolyte replenishment and passive stretching recommended.",
    timestamp: "Yesterday",
    symptoms: ["Delayed muscle soreness", "Mild cramping", "Darker urine"],
    keywords: ["DOMS", "Lactic threshold", "Electrolytes", "Protein synthesis"],
    metrics: {
      factorScores: [
        { name: "Electrolyte Balance", value: 45, color: "#f59e0b" },
        { name: "Muscle Micro-trauma", value: 85, color: "#14b8a6" },
        { name: "Recovery Index", value: 60, color: "#06b6d4" },
      ]
    },
    messages: [
      {
        id: "m-2-1",
        sender: "user",
        timestamp: "3:30 PM",
        text: "I finished an intense 90-minute leg training session. Now my calves are twitching and feeling stiff.",
      },
      {
        id: "m-2-2",
        sender: "assistant",
        timestamp: "3:31 PM",
        insight: {
          topic: "Acute Exercise-Induced Fasciculation & Muscular Fatigue",
          causes: [
            { title: "Transient Hyponatremia / Hypomagnesemia", badge: "Primary Factor", desc: "Sodium and magnesium loss via sweat affecting neuromuscular junction repolarization." },
            { title: "Delayed Onset Muscle Soreness (DOMS)", badge: "Expected", desc: "Microscopic myofibrillar tears provoking localized inflammatory cytokine cascades." }
          ],
          symptoms: [
            "Involuntary gastrocnemius twitching (fasciculations)",
            "Stiffness during eccentric quadriceps extension",
            "Mild localized warmth over trained muscle groups"
          ],
          info: [
            "Muscle twitching post-exercise is typically benign neuromuscular hyperexcitability.",
            "Rapid intake of pure water without sodium can paradoxically worsen intracellular osmotic shifts."
          ],
          nextStep: {
            action: "Consume 400-600ml of electrolyte beverage with sodium and potassium, perform gentle dynamic stretching, and ensure 25-30g dietary protein for tissue rebuilding.",
            urgency: "Routine Recovery",
            consultSpecialist: "Sports Physiologist if symptoms persist > 72h"
          }
        }
      }
    ]
  },
  {
    id: "3",
    title: "Seasonal Allergies vs Rhinitis",
    lastMessage: "Non-sedating second generation antihistamine considerations.",
    timestamp: "3 days ago",
    symptoms: ["Nasal congestion", "Pruritus (itching)", "Paroxysmal sneezing"],
    keywords: ["Histamine", "Allergen load", "IgE", "HEPA filtration"],
    metrics: {
      factorScores: [
        { name: "Allergen Exposure", value: 92, color: "#f43f5e" },
        { name: "Mucosal Inflammation", value: 78, color: "#14b8a6" },
        { name: "Immune Response", value: 64, color: "#8b5cf6" },
      ]
    },
    messages: [
      {
        id: "m-3-1",
        sender: "user",
        timestamp: "8:45 AM",
        text: "My eyes are intensely itchy and I have had fits of sneezing every morning after opening windows.",
      },
      {
        id: "m-3-2",
        sender: "assistant",
        timestamp: "8:46 AM",
        insight: {
          topic: "Allergic Rhinoconjunctivitis (Seasonal Pollen Sensitization)",
          causes: [
            { title: "Airborne Pollen/Aeroallergen Trigger", badge: "High Probability", desc: "IgE-mediated mast cell degranulation releasing histamine into mucosal tissue." },
            { title: "Environmental Particulate Load", badge: "Contributing Factor", desc: "Morning pollen peak dispersion between 5 AM and 10 AM." }
          ],
          symptoms: [
            "Bilateral conjunctival pruritus (itching) and chemosis",
            "Clear, thin rhinorrhea without purulent discharge",
            "Paroxysmal sneezing bursts (> 3 consecutive sneezes)"
          ],
          info: [
            "Unlike viral upper respiratory infections, allergic rhinitis rarely presents with fever or body aches.",
            "Keeping windows closed during peak morning pollen hours reduces indoor allergen concentration by up to 80%."
          ],
          nextStep: {
            action: "Use isotonic saline nasal rinse to clear trapped aeroallergens. Consider discussing 2nd generation OTC antihistamines (e.g. Cetirizine/Fexofenadine) with your pharmacist.",
            urgency: "Symptom Management",
            consultSpecialist: "Allergist / Immunologist"
          }
        }
      }
    ]
  }
];

export const initialSavedInsights = [
  {
    id: "ins-1",
    title: "Tension-Type Headache & Eye Strain",
    topic: "Digital Asthenopia and Cervicogenic Tension",
    category: "Neurology",
    date: "May 18, 2026",
    summary: "Bilateral forehead pressure linked to 8+ hours screen exposure and reduced blink frequency. Responsive to 20-20-20 rule and electrolyte hydration.",
    tags: ["Headache", "Screen Fatigue", "Hydration", "Ergonomics"],
    causes: ["Digital Eye Strain", "Suboccipital Muscle Spasm", "Mild Dehydration"],
    symptoms: ["Temple pressure", "Dry eyes", "Neck stiffness"],
    nextStep: "Practice 20-20-20 visual resets, hydrate with 500ml water, and monitor trigger frequency.",
  },
  {
    id: "ins-2",
    title: "Post-HIIT Muscular Recovery & Electrolytes",
    topic: "Exercise-Induced Fasciculations & DOMS",
    category: "Physical Health",
    date: "May 15, 2026",
    summary: "Calf fasciculations and muscle stiffness following high-intensity workout. Sodium/magnesium sweat depletion mapped with tissue repair cycles.",
    tags: ["DOMS", "Electrolytes", "Muscle Cramps", "Fitness"],
    causes: ["Electrolyte Shift", "Myofibrillar Micro-tears"],
    symptoms: ["Muscle twitching", "Localized stiffness"],
    nextStep: "Consume electrolyte drink with potassium/sodium, perform light static stretches, and rest.",
  },
  {
    id: "ins-3",
    title: "Allergic Rhinoconjunctivitis Morning Flare",
    topic: "IgE Mast Cell Degranulation & Aeroallergens",
    category: "Immunology",
    date: "May 10, 2026",
    summary: "Morning sneezing paroxysms and itchy conjunctiva caused by tree pollen peak dispersal between 6 AM and 9 AM.",
    tags: ["Allergies", "Histamine", "Pollen", "Rhinitis"],
    causes: ["Pollen Allergen Inhalation", "IgE Histamine Cascade"],
    symptoms: ["Sneezing bursts", "Itchy watery eyes", "Clear nasal drip"],
    nextStep: "Perform isotonic nasal flush after outdoor exposure and discuss second-generation antihistamines with a doctor.",
  },
  {
    id: "ins-4",
    title: "Circadian Rhythm Phase Delay & REM Quality",
    topic: "Suprachiasmatic Nucleus Light Exposure",
    category: "Sleep Medicine",
    date: "Apr 28, 2026",
    summary: "Fragmented sleep architecture and delayed sleep onset from evening high-frequency blue light exposure suppressing melatonin secretion.",
    tags: ["Sleep", "Melatonin", "Circadian Rhythm", "Recovery"],
    causes: ["Evening Lux Exposure", "Irregular Sleep Window", "Adenosine Interference"],
    symptoms: ["Sleep onset latency > 40 min", "Morning grogginess"],
    nextStep: "Establish 10:30 PM dark protocol, avoid caffeine past 2 PM, and seek 10 min natural sunlight upon waking.",
  }
];

export const mockMedicalKnowledge = {
  headache: {
    topic: "Tension-Type Cephalea & Digital Asthenopia",
    causes: [
      { title: "Digital Eye Strain (Asthenopia)", badge: "High Probability", desc: "Sustained micro-fluctuations in ciliary muscle accommodation from display flicker and glare." },
      { title: "Cervicogenic Muscular Tension", badge: "Very Common", desc: "Tightness in trapezius and splenius capitis muscles radiating upward into the occiput and temples." },
      { title: "Subclinical Hydration Deficit", badge: "Lifestyle Factor", desc: "Mild plasma volume reduction leading to transient dural vascular sensitivity." }
    ],
    symptoms: [
      "Dull, non-throbbing pressure around forehead, crown, or temples",
      "Periorbital heaviness or ocular fatigue",
      "Stiffness in cervical spine or shoulder girdle"
    ],
    info: [
      "Tension-type headaches do not typically present with aura, severe unilateral throbbing, or pronounced photo/phonophobia.",
      "The 20-20-20 rule (looking at an object 20 feet away for 20 seconds every 20 minutes) reduces visual accommodation stress by over 60%."
    ],
    nextStep: {
      action: "Drink 500ml water, step away from digital screens for 15 minutes in a dimly lit space, and apply gentle neck stretches. Consult a physician if pain is abrupt ('thunderclap') or accompanied by neurological deficits.",
      urgency: "Routine / Self-Care",
      consultSpecialist: "General Practitioner / Neurologist"
    },
    symptomsList: ["Forehead pressure", "Temple ache", "Eye strain", "Neck stiffness"],
    keywordsList: ["Screen time", "Posture", "Hydration", "Ergonomics"],
    factorScores: [
      { name: "Visual Strain Factor", value: 85, color: "#06b6d4" },
      { name: "Hydration Adequacy", value: 48, color: "#f59e0b" },
      { name: "Cervical Tension", value: 72, color: "#14b8a6" },
      { name: "Stress Correlation", value: 58, color: "#8b5cf6" },
    ]
  },
  sleep: {
    topic: "Circadian Rhythm Disruption & Sleep Architecture Alteration",
    causes: [
      { title: "Suppressed Melatonin Release", badge: "Primary Trigger", desc: "Artificial blue spectrum light inhibiting pineal gland melatonin synthesis within 2 hours of bedtime." },
      { title: "Adenosine Receptor Blockade", badge: "Secondary Trigger", desc: "Residual circulating caffeine (half-life of 5-7 hours) reducing homeostatic sleep pressure." },
      { title: "Sympathetic Nervous System Hyperarousal", badge: "Contributing Factor", desc: "Elevated evening cortisol from late work, high stress, or intensive evening workouts." }
    ],
    symptoms: [
      "Sleep latency exceeding 30-45 minutes",
      "Frequent nocturnal micro-awakenings with difficulty falling back asleep",
      "Unrefreshing sleep and daytime fatigue"
    ],
    info: [
      "Consistent wake-up times anchor the suprachiasmatic nucleus circadian pacemaker more effectively than variable bedtime schedules.",
      "A bedroom ambient temperature between 17°C to 19°C (63°F–66°F) supports the natural core body temperature drop required for deep NREM sleep."
    ],
    nextStep: {
      action: "Create a 60-minute tech-free wind-down buffer, dim ambient home lighting after 9 PM, avoid caffeine 8 hours before target sleep time, and get 10-15 minutes of natural morning sunlight.",
      urgency: "Behavioral Optimization",
      consultSpecialist: "Sleep Medicine Specialist / Behavioral Health"
    },
    symptomsList: ["Delayed sleep onset", "Night awakenings", "Morning fatigue", "Brain fog"],
    keywordsList: ["Melatonin", "Circadian Rhythm", "Sleep Hygiene", "Cortisol"],
    factorScores: [
      { name: "Circadian Sync Index", value: 52, color: "#8b5cf6" },
      { name: "Evening Screen Impact", value: 90, color: "#f43f5e" },
      { name: "Sleep Hygiene Score", value: 62, color: "#14b8a6" },
    ]
  },
  fatigue: {
    topic: "Chronic Fatigue & Metabolic Energy Depletion",
    causes: [
      { title: "Micronutrient Insufficiency", badge: "Consideration", desc: "Suboptimal serum ferritin, Vitamin D3, or B12 levels impacting cellular ATP production." },
      { title: "Chronic Restorative Sleep Deficit", badge: "Common Factor", desc: "Reduced slow-wave sleep reducing neuromuscular recovery and hormonal homeostasis." },
      { title: "Sedentary Deconditioning", badge: "Lifestyle Factor", desc: "Decreased mitochondrial capillary density leading to elevated perceived exertion." }
    ],
    symptoms: [
      "Persistent low physical energy unrelated to recent strenuous exertion",
      "Difficulty concentrating, mild memory lapses (brain fog)",
      "Mid-afternoon energy crashes"
    ],
    info: [
      "Fatigue lasting greater than 4-6 weeks should always be evaluated with standard metabolic blood panels (CBC, Ferritin, TSH, Vit D, HbA1c).",
      "Hydration and consistent dietary protein intake help stabilize glycemic swings that cause severe fatigue dips."
    ],
    nextStep: {
      action: "Schedule a routine wellness panel with your primary care provider to test basic metabolic markers, ensure balanced meals with complex carbs/protein, and maintain steady hydration.",
      urgency: "Routine Clinical Evaluation",
      consultSpecialist: "Primary Care Physician"
    },
    symptomsList: ["Low energy", "Brain fog", "Afternoon crash", "Heavy limbs"],
    keywordsList: ["Ferritin", "Vitamin D", "Thyroid", "ATP Synthesis"],
    factorScores: [
      { name: "Metabolic Biomarker Factor", value: 68, color: "#14b8a6" },
      { name: "Recovery Depletion", value: 75, color: "#f59e0b" },
      { name: "Physical Activity Index", value: 45, color: "#06b6d4" },
    ]
  },
  cough: {
    topic: "Upper Respiratory Irritation & Post-Nasal Drip Syndrome",
    causes: [
      { title: "Upper Airway Cough Syndrome (UACS)", badge: "High Likelihood", desc: "Mucus secretions dripping down the posterior pharynx triggering mechanical cough receptors." },
      { title: "Post-Viral Bronchial Hyperresponsiveness", badge: "Frequent Post-Cold", desc: "Transiently sensitive sensory c-fibers remaining hyperreactive for 2-4 weeks after viral clearance." },
      { title: "Gastroesophageal Reflux Micro-Aspiration", badge: "Nighttime Trigger", desc: "Acidic gastric vapor irritating laryngeal tissue when lying flat." }
    ],
    symptoms: [
      "Tickle or irritation in the hypopharynx provoking sudden cough",
      "Clearing of throat frequently, especially in the morning or after meals",
      "Dry, non-productive or minimally productive cough"
    ],
    info: [
      "A cough lasting under 3 weeks is acute and most commonly viral or irritant-related; chronic cough exceeds 8 weeks.",
      "Honey (1-2 teaspoons for adults) has demonstrated equivalent or superior soothing efficacy to dextromethorphan in clinical trials."
    ],
    nextStep: {
      action: "Use steam inhalation, stay well-hydrated with warm fluids, elevate head slightly while sleeping, and consult a doctor if coughing up blood, experiencing shortness of breath, or fever > 38.5°C.",
      urgency: "Routine Symptom Relief",
      consultSpecialist: "Primary Care / Pulmonology"
    },
    symptomsList: ["Throat tickle", "Dry cough", "Post-nasal drip", "Hoarseness"],
    keywordsList: ["Bronchial", "Airway", "Hydration", "Reflux"],
    factorScores: [
      { name: "Airway Irritation Index", value: 74, color: "#f59e0b" },
      { name: "Post-Nasal Secretion", value: 80, color: "#06b6d4" },
      { name: "Respiratory Comfort", value: 55, color: "#14b8a6" },
    ]
  },
  backpain: {
    topic: "Mechanical Lumbar Strain & Postural Myofascial Tension",
    causes: [
      { title: "Lumbar Paraspinal Muscle Strain", badge: "Most Likely", desc: "Micro-spasms in erector spinae and quadratus lumborum from prolonged flexion or unconditioned lifting." },
      { title: "Pelvic Tilt & Gluteal Inactivity", badge: "Postural Factor", desc: "'Gluteal amnesia' from prolonged sitting shifting mechanical load onto the lumbar spine." },
      { title: "Core Musculature Deconditioning", badge: "Stabilization Issue", desc: "Underactive transverse abdominis failing to brace intra-abdominal pressure during movement." }
    ],
    symptoms: [
      "Aching or stiffness localized across the lower back",
      "Aggravation when rising from seated position or bending forward",
      "Absence of radiating leg shooting pain or numbness"
    ],
    info: [
      "Over 85% of acute low back pain episodes are non-specific mechanical strains that resolve within 4-6 weeks with active movement.",
      "Prolonged complete bed rest is counterproductive; light daily walking promotes intervertebral disc nutrient diffusion."
    ],
    nextStep: {
      action: "Maintain gentle walking, apply alternating heat/cold therapy for 15-minute intervals, avoid heavy lumbar spinal loading, and see a doctor immediately if experiencing numbness down legs or bowel/bladder issues (red flags).",
      urgency: "Routine Rehabilitation",
      consultSpecialist: "Physiotherapist / Orthopedic Specialist"
    },
    symptomsList: ["Lower back ache", "Stiffness after sitting", "Restricted flexion"],
    keywordsList: ["Lumbar", "Postural", "Ergonomics", "Physiotherapy"],
    factorScores: [
      { name: "Musculoskeletal Strain", value: 82, color: "#f43f5e" },
      { name: "Core Engagement", value: 40, color: "#f59e0b" },
      { name: "Mobility Score", value: 58, color: "#14b8a6" },
    ]
  }
};

export function generateMockAIResponse(userText) {
  const text = userText.toLowerCase();
  
  if (text.includes("headache") || text.includes("head") || text.includes("migraine") || text.includes("temple")) {
    return mockMedicalKnowledge.headache;
  }
  if (text.includes("sleep") || text.includes("insomnia") || text.includes("tired") && text.includes("night") || text.includes("wake")) {
    return mockMedicalKnowledge.sleep;
  }
  if (text.includes("fatigue") || text.includes("exhausted") || text.includes("energy") || text.includes("drowsy")) {
    return mockMedicalKnowledge.fatigue;
  }
  if (text.includes("cough") || text.includes("throat") || text.includes("cold") || text.includes("flu") || text.includes("sneez")) {
    return mockMedicalKnowledge.cough;
  }
  if (text.includes("back") || text.includes("spine") || text.includes("lumbar") || text.includes("stiff") || text.includes("muscle")) {
    return mockMedicalKnowledge.backpain;
  }

  // Dynamic Synthesis for any other query
  const words = userText.split(" ").filter(w => w.length > 3).slice(0, 3).join(" ");
  const queryTitle = words ? words.charAt(0).toUpperCase() + words.slice(1) : "Symptom Analysis";

  return {
    topic: `Clinical Information Overview: ${queryTitle}`,
    causes: [
      { 
        title: "Multifactorial Physiological Response", 
        badge: "Potential Trigger", 
        desc: `Symptoms correlating with reported experiences around ${words || "current bodily discomfort"}. Potential lifestyle or physiological variation.` 
      },
      { 
        title: "Environmental & Stress Factors", 
        badge: "Secondary Factor", 
        desc: "External stressors, hydration variations, dietary changes, and circadian rest cycles impacting bodily homeostasis." 
      }
    ],
    symptoms: [
      `Reported symptom profile: "${userText.slice(0, 80)}${userText.length > 80 ? '...' : ''}"`,
      "Possible associated localized discomfort or autonomic changes",
      "Variations in daily energy levels or physical comfort"
    ],
    info: [
      "Doc.ai synthesizes evidence-based medical literature to help prepare users for more productive clinical consultations.",
      "Symptom patterns that are progressive, severe, or interfere with daily living warrant comprehensive medical history review with a certified healthcare provider."
    ],
    nextStep: {
      action: "Track symptom frequency, onset triggers, and severity ratings in a health diary. Share this structured report with your healthcare clinician during your next visit.",
      urgency: "Informational Review",
      consultSpecialist: "Board-Certified Medical Doctor"
    },
    symptomsList: [words || "Reported Symptoms", "Fatigue / Discomfort", "Physiological Strain"],
    keywordsList: ["Clinical Analysis", "Symptom Tracking", "Wellness", "Assessment"],
    factorScores: [
      { name: "Symptom Relevance", value: 70, color: "#14b8a6" },
      { name: "Lifestyle Correlation", value: 65, color: "#06b6d4" },
      { name: "Information Precision", value: 80, color: "#8b5cf6" },
    ]
  };
}
