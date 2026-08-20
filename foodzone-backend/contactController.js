const Contact = require("../models/Contact");

// @route POST /api/contact
const createContact = async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;
    
    const contactData = {
      name,
      email,
      phone,
      subject,
      message
    };

    // If user is logged in, attach user ID
    if (req.user) {
      contactData.user = req.user._id;
    }

    const contact = await Contact.create(contactData);
    
    res.status(201).json({
      success: true,
      message: "Thank you for contacting us! We'll get back to you soon.",
      contact
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: error.message 
    });
  }
};

// @route GET /api/contact (admin only)
const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find({})
      .populate("user", "name email phone")
      .sort({ createdAt: -1 });
    
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route PUT /api/contact/:id/status (admin only)
const updateContactStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    
    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }
    
    res.json(contact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createContact,
  getAllContacts,
  updateContactStatus
};
