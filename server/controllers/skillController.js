exports.analyzeSkillGap = async (req, res) => {
  try {
    const { jobDescription, userSkills } = req.body;

    if (!jobDescription) {
      return res.status(400).json({ message: 'Job Description is required' });
    }

    const knownSkills = [
      'react', 'node', 'express', 'mongodb', 'javascript', 'python',
      'fastapi', 'jwt', 'rest api', 'css', 'git', 'sql', 'docker', 
      'typescript', 'html', 'aws', 'redux', 'tailwind'
    ];

    const jdLower = jobDescription.toLowerCase();
    const requiredSkills = knownSkills.filter((skill) => jdLower.includes(skill));

    const userSkillsLower = (userSkills || []).map((s) => s.toLowerCase().trim());

    const matchedSkills = requiredSkills.filter((skill) => userSkillsLower.includes(skill));
    const missingSkills = requiredSkills.filter((skill) => !userSkillsLower.includes(skill));

    const matchScore = requiredSkills.length > 0
      ? Math.round((matchedSkills.length / requiredSkills.length) * 100)
      : 100;

    res.json({
      matchScore,
      requiredSkills,
      matchedSkills,
      missingSkills,
      recommendation: missingSkills.length > 0
        ? `Focus on learning: ${missingSkills.join(', ')}`
        : 'Great match! Your skill set satisfies the primary tech requirements.'
    });
  } catch (error) {
    res.status(500).json({ message: 'Error performing analysis', error: error.message });
  }
};