const Inventory = require('../models/inventory.model');
const { inventoryValidation } = require('../validation');

const getAll = async (req,res)=>{
    await Inventory.find({},(err,doc)=>{
        res.send(err?err:doc);
    });
};

const getOne = async (req,res)=>{
    await Inventory.findOne({_id:req.params._id},(err,doc)=>{
        res.send(err?err:doc);
    });
};

const updateOne = async (req,res)=>{
    // Validation
    const { error } = inventoryValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    // Delete Inventory if new quantity is 0
    if(req.body.quantity==0){
        await Inventory.findByIdAndDelete(req.params._id,(err)=>{
            res.send(err?err:"Item deleted");
        })
    }
    else{
        await Inventory.findByIdAndUpdate(req.params._id,req.body,(err,doc)=>{
            res.send(err?err:doc);
        })
    }
};

const createOne = async (req,res)=>{
    
    // Validation
    const { error } = inventoryValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    // Check if item already exists in DB
    const itemExists = await Inventory.findOne({ itemName : req.body.itemName });
    if(itemExists) return res.status(400).send('Item already exists');

    const inventory = new Inventory({
        itemName : req.body.itemName,
        quantity : req.body.quantity
    });
    try{
        const savedInventory = await inventory.save();
        res.send(savedInventory);
    }catch(err){
        res.status(400).send(err);
    }
};

module.exports = {
    getAll,
    getOne,
    updateOne,
    createOne
}