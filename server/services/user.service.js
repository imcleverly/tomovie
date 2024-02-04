const passwordHash = require("password-hash");

const User = require("../models/user.model");
const Movie = require("../models/movie.model");

const getLikedMovies = async (_id) => {
  const user = await User.findOne({ _id }).lean();

  return user?.likedMovies || [];
};

const addLikedMovie = async (userId, movieId) => {
  const user = await User.findOne({ _id: userId }).lean();
  const movie = await Movie.findOne({ _id: movieId }).lean();

  if (!user) throw new Error("User not found");
  if (!movie) throw new Error("Movie not found");

  if (user.likedMovies.includes(movieId))
    throw new Error("Movie already exists in your favorites");

  user.likedMovies.push(movieId.toString());
  await user.save();
};

const deleteLikedMovie = async (userId, movieId) => {
  const user = await User.findOne({ _id: userId }).lean();
  const movie = await Movie.findOne({ _id: movieId }).lean();

  if (!user) throw new Error("User not found");
  if (!movie) throw new Error("Movie not found");

  if (!user.likedMovies.includes(movieId))
    throw new Error("Movie doesn't exist in your favorites");

  user.likedMovies = user.likedMovies.filter((movie) => movie !== movieId);
  await user.save();
};

const deleteAllLikedMovies = async (userId) => {
  const user = await User.findOne({ _id: userId }).lean();

  if (!user) throw new Error("User not found");

  user.likedMovies = [];
  await user.save();
};

const updateProfile = async (fullName, image, userId) => {
  const user = await User.findOne({ _id: userId }).lean();

  if (!user) throw new Error("User not found");
  if (fullName && !fullName?.trim())
    throw new Error("Full name cannot be empty");
  if (image && !image?.trim()) throw new Error("Empty image");

  user.fullName = fullName || user.fullName;
  user.image = image || user.image;

  const newUser = await user.save();

  return {
    fullName: newUser.fullName,
    image: newUser.image,
  };
};

const changePassword = async (oldPassword, newPassword, _id) => {
  const user = await User.findOne({ _id }).lean();
  const isPassed = passwordHash.verify(oldPassword, user.password);
  const isDuplicate = passwordHash.verify(newPassword, user.password);
  if (!isPassed) throw new Error("Password does not correct");
  if (isDuplicate) throw new Error("Duplicate old password");

  console.log({ password: passwordHash.generate(newPassword) });

  if (
    !newPassword ||
    !newPassword.trim() ||
    newPassword.includes(" ") ||
    (newPassword.length < 6 && user.role !== "Admin")
  )
    throw new Error(
      "Password must be at least 6 characters and not contain space characters"
    );

  user.password = passwordHash.generate(newPassword);

  await user.save();
};

const deleteProfile = async (_id) => {
  const user = await User.findOne({ _id }).lean();

  if (!user) throw new Error("User not found");

  await User.deleteOne({ _id });
};

module.exports = {
  getLikedMovies,
  addLikedMovie,
  deleteLikedMovie,
  deleteAllLikedMovies,
  updateProfile,
  changePassword,
  deleteProfile,
};
