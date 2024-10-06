import express, { request, response, Route } from "express";
import { Book } from "../models/bookmodel.js";

const router = express.Router();


//Route for save a new book
router.post('/', async (request, response) => {
    try {
        const { title, author, publishYear } = request.body;

        // Validate that all required fields are present
        if (!title || !author || !publishYear) {
            return response.status(400).send({
                message: 'Send all required fields: title, author, publishYear',
            });
        }

        // Create the new book
        const newBook = new Book({
            title,
            author,
            publishYear,
        });

        const savedBook = await newBook.save(); // Save the book to the database

        return response.status(201).json(savedBook); // Return the created book with a 201 status
    } catch (error) {
        console.log(error.message);
        return response.status(500).send({ message: error.message });
    }
});

router.get('/', async (request, response) => {
    try {
        const books = await Book.find({});

        return response.status(200).json({
            count: books.length,
            data: books,
        });
    } catch (error) {
        console.error(`Error fetching books: ${error.message}`); // Enhanced logging
        return response.status(500).send({ message: error.message });
    }
});


router.get('/:id', async (request, response) => {
    try {
        const { id } = request.params;

        // Log the ID to ensure it's being received correctly
        console.log(`Fetching book with ID: ${id}`);

        const book = await Book.findById(id); // Use findById to get a single book

        if (!book) {
            return response.status(404).json({ message: 'Book not found' });
        }

        return response.status(200).json(book);
    } catch (error) {
        console.error(`Error fetching book: ${error.message}`); // Log error for debugging
        return response.status(500).json({ message: error.message }); // Use json() for consistent response
    }
});


router.put('/:id', async (request, response) => {
    try {
        if(
            !request.body.title ||
            !request.body.author ||
            !request.body.publishYear
        ){
            return response.status(400).send({
                message:'Send all required fields: title, author, publishYear',
            });
        }

        const {id} = request.params;

        const result = await Book.findByIdAndUpdate(id, request.body);

        if (!result){
            return response.status(404).json({message: "Book not found"});
        }
        return response.status(200).send({message: 'book update successfully!!'});

    }catch (error){
        console.log(error.message);
        response.status(500).send({message:error.message});
    }
});

router.delete('/:id', async (request, response) => {
    try {
        const { id } = request.params;

        // Use the correct model name (Book)
        const result = await Book.findByIdAndDelete(id);

        if (!result) {
            return response.status(404).json({ message: 'Book not found' });
        }
        return response.status(200).send({ message: 'Book deleted successfully' }); // Corrected 'sent' to 'send'
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

export default router;