const bookModel = require("../models/bookModel");
const valid = require("../validations/validator.js");
// const reviewModel = require("../models/reviewModel");
const mongoose = require("mongoose");
// const {uploadFile}=require("../aws/aws")

//=====================================create book function=========================================//
const createbook = async function (req, res) {
  try {
    let data = req.body;
    let { title, excerpt, userId, ISBN, category, subcategory, releasedAt } = data;
    // let files= req.files
    // if(files && files.length>0){
    //     //upload to s3 and get the uploaded link
    //     // res.json the link back to frontend/postman
    //     let uploadedFileURL= await uploadFile(files[0])
    //    // res.status(201).json({msg: "file uploaded succesfully", data: uploadedFileURL})
    //    data.bookCover=uploadedFileURL
    // }
    // else{
    //    return res.status(400).json( "No file found" )
    // }
   

    //                                <<===emptyRequest===>>                                   //
    if (!valid.isValidRequestBody(data)) {
      return res.status(400).json( "plz provide data" );
    }
    //                              <<===mandatory/format===>>                                    //
    
    //---title---//
    if(!valid.isValid(title)){ return res.status(400).json( " title is required");}
    const dublicatetitle = await bookModel.findOne({ title: title });
    if(dublicatetitle){ return res.status(409).json(" title should be unique");}

    //---excerpt---//
    if (!valid.isValid(excerpt)) {return res.status(400).json( " excerpt is required" ); }

    //---userId---//
    if(!userId){return res.status(400).json( " userId is required" );}
    if (!valid.isValidObjectId(userId)) {return res.status(400).json( " userId is not valid" );
    }
   
    //---ISBN---//
    if (!valid.isValid(ISBN)) {return res.status(400).json( " ISBN is required" ); }
    if(!valid.isValidA(ISBN) ){ return res.status(400).json( " ISBN is Invalid" );}
    const dublicateISBN = await bookModel.findOne({ ISBN: ISBN });
    if (dublicateISBN) { return res.status(409).json( " ISBN is Already present" ); }
    //---category---//
    if (!valid.isValid(category)) {return res.status(400).json( " category is required" );}
    //---subcategory---//
    if (!valid.isValid(subcategory)) {return res.status(400).json( " subcategory is required");}
    //---releasedAt---//
    if(!valid.isValid(releasedAt)){return res.status(400).json("provide releasedAt date")}
    // if (!valid.isValidDate(releasedAt)) {return res.status(400).json(" releasedAt date should be in format=> yyyy-mm-dd");}
    //---creating data---//
    let savedData = await bookModel.create(data);
    res.status(201).json( savedData );
  } catch (error) {
    res.status(500).json(error.message);
  }
};

//===========================================getBookData==============================================//

const getBook = async function (req, res) {
  try {
    let data = req.query;
    const { userId} = data;

    if (userId) {
      if (!mongoose.isValidObjectId(data.userId))
       { return res.status(400).json( "User id is not valid" );}
    }
    const returnBook = await bookModel.find()/*{ $and: [data, { isDeleted: false }] }*/
      .select("title excerpt userId category releasedAt reviews")
      .sort({ title: 1 });
    if (returnBook.length > 0) {
      return res.status(200).json(returnBook );
    } else {
      res.status(404).json("No Book Found" );
    }
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};

//==========================================getBookDataById============================================//

const getById = async (req, res) => {
  try {
    let data = req.params.bookId;
    if (data) {
      if (!mongoose.Types.ObjectId.isValid(data)) {
        return res
          .status(400)
          .json( "!!Oops Book id is not valid" );
      }
    }

    let allbooks = await bookModel.findById(data);
    if (!allbooks) { return res.status(404).json( "book not found" );}
    if ( allbooks.isDeleted === true) { return res.status(404).json( "book is Deleted" ); }
 //console.log({...allbooks})
    let reviews = await reviewModel
      .find({ bookId: data })
      .select("reviewedBy reviewedAt rating review");//.lean();
    const result = allbooks._doc;
    result.reviewsData = reviews;
    res.status(200).json(result );
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }

};

//============================================updateBook==============================================//

const updatebook = async function (req, res) {
  try {
    let id = req.params.bookId;
    let book = await bookModel.findById(id);
    if (!book || book.isDeleted === true) {
      return res.status(404).json("book not found..");
    }
    const requestBody = req.body;
    if (!valid.isValidRequestBody(requestBody)) {
      return res.status(400).json( " Please provide updation details");
    }
    // - title  - excerpt  - release date - ISBN

    if (req.body.title) {
      if (valid.isValid(req.body.title)) {
        const validTitle = await bookModel.findOne({ title: req.body.title });
        if (validTitle) {
          return res.status(400).json( "Title already exists...");
        }
        book.title = req.body.title.trim();
      } else {
        return res.status(400).json("Title must be string.");
      }
    }
    if (req.body.excerpt) {
      if (valid.isValid(req.body.excerpt)) {
        book.excerpt = req.body.excerpt.trim();
      } else {
        return res.status(400).json( "excerpt must be string.");
      }
    }
    if (req.body.ISBN) {
      if (valid.isValidA(req.body.ISBN)) {
        const validISBN = await bookModel.findOne({ ISBN: req.body.ISBN });
        if (validISBN) {
          return res.status(400).json("ISBN already exists...");
        }
        book.ISBN = req.body.ISBN.trim();
      } else {
        return res.status(400).json("Book ISBN must be string and valid");
      }
    }
    if (req.body.releasedAt) {
      if(valid.isValidDate(releasedAt)){
      book.releasedAt = req.body.releasedAt;}
      else{
        return res.status(400).json( "releasedAt date should be in format=> yyyy-mm-dd")
      }
    }
    // book.releasedAt = moment();
    let book2 = await bookModel.findByIdAndUpdate({ _id: id }, book, {
      new: true,
    });
    return res
      .status(200)
      .json( book2 );
  } catch (err) {
    return res.status(500).json({ status: false, message: err.message });
  }
};


//============================================deleteBook===============================================//

let deleteBooks = async function (req, res) {
  try {
    let bookId = req.params.bookId;
    if (!mongoose.Types.ObjectId.isValid(bookId)) {
      return res
        .status(400)
        .json( "not a valid bookId");
    }
    const checkBookId = await bookModel.findOne({
      _id: bookId,
      isDeleted: false,
    });
    if (!checkBookId)
      return res
        .status(404)
        .json("Book Not Found Maybe Deleted");

    await bookModel.findOneAndUpdate(
      { _id: checkBookId._id },
      { isDeleted: true, deletedAt: new Date() }
    );
    return res
      .status(200)
      .json( "Successfully Deleted" );
  } catch (err) {
    res.status(500).json( err.message );
  }
};

module.exports = { createbook, getBook, getById, updatebook, deleteBooks };