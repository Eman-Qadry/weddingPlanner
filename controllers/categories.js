const express = require("express");
const Category = require("../models/categories");


const add= async (req, res) => {
    try {
        const { name,description,image} = req.body;

        const existingCategory = await Category.findOne({ name });
        if (existingCategory) {
            return res.status(400).json({ message: "Category already exists" });
        }

        const newCategory = new Category({ name, description, image });
        await newCategory.save();

        res.status(201).json({ message: "Category added successfully", category: newCategory });
    } catch (err) {
        res.status(500).json({ message: "Error adding category", error: err.message });
    }
};

const update= async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, image } = req.body;

        const updatedCategory = await Category.findByIdAndUpdate(id, { name, description, image }, { new: true });
        if (!updatedCategory) {
            return res.status(404).json({ message: "Category not found" });
        }

        res.json({ message: "Category updated successfully", category: updatedCategory });
    } catch (err) {
        res.status(500).json({ message: "Error updating category", error: err.message });
    }
}

const listAll= async (req, res) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (err) {
        res.status(500).json({ message: "Error fetching categories", error: err.message });
    }
}

const listById= async (req, res) => {
    try {
        const { id } = req.params;
        const category = await Category.findById(id);
        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }
        res.json(category);
    } catch (err) {
        res.status(500).json({ message: "Error fetching category", error: err.message });
    }
}
const deleteById= async (req, res) => {
    try {
        const { id } = req.params;
        const deletedCategory = await Category.findByIdAndDelete(id);
        if (!deletedCategory) {
            return res.status(404).json({ message: "Category not found" });
        }
        res.json({ message: "Category deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Error deleting category", error: err.message });
    }
}
const searchByName=async (req, res) => {
    try {
        const { name } = req.params;
        const categories = await Category.find({ name: { $regex: name, $options: "i" } });
        res.json(categories);
    } catch (err) {
        res.status(500).json({ message: "Error searching categories", error: err.message });
    }
}
const searchById= async (req, res) => {
    try {
        const { id } = req.params;
        const category = await Category.findById(id);
        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }
        res.json(category);
    } catch (err) {
        res.status(500).json({ message: "Error searching category", error: err.message });
    }
}


module.exports = {add,listAll,update,deleteById,listById,searchByName,searchById};
