const { Comment, Pizza } = require("../models");

const commentController = {
  // add comment to pizza
  addComment({ params, body }, res) {
    // console.log(body);
    Comment.create(body)
      .then(({ _id }) => {
        return Pizza.findOneAndUpdate(
          { _id: params.pizzaId },
          { $push: { comments: _id } },
          { new: true }
        );
      })
      .then((dbPizzaData) => {
        if (!dbPizzaData) {
          res.status(404).json({ message: "No pizza found with this id!" });
          return;
        }
        res.json(dbPizzaData);
      })
      .catch((err) => res.json(err));

    // create addReply method
  },
  addReply({ params, body }, res) {
    Comment.findOneAndUpdate(
      { _id: params.commentId },
      { $push: { replies: body } },
      { new: true, runValidators: true }
    )
      .then((dbPizzaData) => {
        if (!dbPizzaData) {
          res.status(404).json({ message: "No pizza found with this id!" });
          return;
        }
        res.json(dbPizzaData);
      })
      .catch((err) => res.json(err));
  },
  // removeReply

  removeReply({ params }, res) {
    Comment.findOneAndUpdate(
      { _id: params.commentId },
      { $pull: { replies: { replyId: params.replyId } } },
      { new: ture }
    )
      .then((dbPizzaData) => res.json(dbPizzaData))
      .catch((err) => res.json(err));
  },

  // remove comment
  removeComment({ params }, res) {
    Comment.findOneAndDelete({ _id: params.commentId })
      .then((deletedComment) => {
        if (!deletedComment) {
          return res
            .status(404)
            .json({ message: "No comment found with this id!" });
        }
        return Pizza.findOneAndUpdate(
          { _id: params.pizzaId },
          { $pull: { comments: params.commentId } },
          { new: true }
        );
      })
      .then((dbPizzaData) => {
        if (!dbPizzaData) {
          res.status(404).json({ message: "No pizza found with this id!" });
          return;
        }
        res.json(dbPizzaData);
      })
      .catch((err) => res.json(err));
  },
};

module.exports = commentController;

// const { Comment, Pizza } = require("../models");

// const commentController = {
//   // add comment to pizza
//   addComment({ params, body }, res) {
//     console.log(body);
//     Comment.create(body)
//       .then(({ _id }) => {
//         return Pizza.findOneAndUpdate(
//           { _id: params.pizzaId },
//           { $push: { comments: _id } },
//           { new: true }
//         );
//       })
//       .then((dbPizzaData) => {
//         if (!dbPizzaData) {
//           res.status(404).json({ message: "No pizza found with this ID!" });
//           return;
//         }
//         res.status(200).json(dbPizzaData);
//       })
//       .catch((err) => res.status(500).json(err));
//   },

//   //remove comment
//   removeComment({ params, body }, res) {
//     Comment.findOneAndDelete({ _id: params.commentId })
//       .then((deletedComment) => {
//         if (!deletedComment) {
//           res.status(404).json({ message: "No comment found with this id!" });
//           return;
//         }
//         return Pizza.findOneAndUpdate(
//           { _id: params.pizzaId },
//           { $pull: { comments: params.commentId } },
//           { new: true }
//         );
//       })
//       .then((dbPizzaData) => {
//         if (!dbPizzaData) {
//           res.status(404).json({ message: "No pizza found with this ID!" });
//           return;
//         }
//         res.status(200).json(dbPizzaData);
//       })
//       .catch((err) => res.status(500).json(err));
//   },
// };

// module.exports = commentController;
