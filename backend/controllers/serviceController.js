import Service from '../models/Service.js';

export const createService = async (req, res, next) => {
  try {
    const { title, description, price, category, address } = req.body;
    if (!title || !price) {
      return res.status(400).json({ message: 'Title and price required' });
    }

    const svc = await Service.create({
      title,
      description,
      price,
      category,
      provider: req.user._id,
      address, 
    });

   
    res.status(201).json(svc);
  } catch (err) {
    next(err);
  }
};


export const getAll = async (req, res, next) => {
  try {
    const services = await Service.find().populate('provider', 'name email');
    res.json(services);
  } catch (err) {
    next(err);
  }
};

export const getMyServices = async (req, res, next) => {
  try {
    const services = await Service.find({ provider: req.user._id });
    res.json(services);
  } catch (err) {
    next(err);
  }
};

export const searchServices = async (req, res, next) => {
  try {
    const { q } = req.query;
    if (!q) return res.json([]); 

    const regex = new RegExp(q, "i"); 

    const services = await Service.find({
      $or: [
        { title: { $regex: regex } },
        { description: { $regex: regex } },
        { category: { $regex: regex } },
        { "address.city": { $regex: regex } },
        { "address.state": { $regex: regex } },
        { "address.pincode": { $regex: regex } },
      ],
    }).populate("provider", "name email");

    res.json(services);
  } catch (err) {
    console.error("Search error:", err);
    next(err);
  }
};



// DELETE service
export const deleteService = async (req, res, next) => {
  try {
    const svc = await Service.findOneAndDelete({
      _id: req.params.id,
      provider: req.user._id, 
    });
    if (!svc) return res.status(404).json({ message: "Service not found" });
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    next(err);
  }
};

// UPDATE service
export const updateService = async (req, res, next) => {
  try {
    const { title, description, price, category, address } = req.body;

    const svc = await Service.findOneAndUpdate(
      { _id: req.params.id, provider: req.user._id },
      {
        title,
        description,
        price,
        category,
        address, 
      },
      { new: true }
    );

    if (!svc) return res.status(404).json({ message: "Service not found" });

    res.json(svc);
  } catch (err) {
    next(err);
  }
};
