const Application = require('../models/Application');

exports.getApplications = async (req, res) => {
  try {
    const apps = await Application.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(apps);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createApplication = async (req, res) => {
  try {
    const { company, position, matchScore, status, notes } = req.body;
    const app = await Application.create({
      user: req.user.id,
      company,
      position,
      matchScore: matchScore || 0,
      status: status || 'Applied',
      notes: notes || ''
    });
    res.status(201).json(app);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteApplication = async (req, res) => {
  try {
    const app = await Application.findById(req.params.id);
    if (!app) return res.status(404).json({ message: 'Application not found' });
    
    if (app.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    await app.deleteOne();
    res.json({ message: 'Application removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};