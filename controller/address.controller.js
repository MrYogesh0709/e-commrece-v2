import { StatusCodes } from "http-status-codes";
import { NotFoundError } from "../errors/customError.js";
import User from "../models/User.model.js";
import Address from "../models/Address.model.js";
import checkPermissions from "../utils/checkPermission.js";

export const addAddress = async (req, res) => {
  const { id: userId } = req.user;
  const { name, email, phone, street, city, state, pinCode } = req.body;

  const user = await User.findById(userId).select(
    "-password -salt -resetPasswordToken"
  );
  if (!user) {
    throw new NotFoundError("User not found");
  }
  const newAddress = new Address({
    name,
    email,
    phone,
    street,
    city,
    state,
    pinCode,
    user: user._id,
  });
  await newAddress.save();
  user.addresses.push(newAddress._id);
  user.populate("addresses");
  await user.save();
  return res.status(StatusCodes.OK).json(user);
};

export const editAddress = async (req, res) => {
  const { id: userId } = req.user;
  const { id: addressId } = req.params;
  const {
    name,
    email: userEmail,
    phone,
    street,
    city,
    state,
    pinCode,
  } = req.body;
  const user = await User.findById(userId).populate("addresses");
  if (!user) {
    throw new NotFoundError("User not found");
  }
  const address = await Address.findById(addressId);
  if (!address) {
    throw new NotFoundError("Address not found");
  }
  checkPermissions(req.user, address.user);
  address.name = name;
  address.email = userEmail;
  address.phone = phone;
  address.street = street;
  address.city = city;
  address.state = state;
  address.pinCode = pinCode;
  address.user = user._id;
  await address.save();
  // Update the addresses field in the user object
  user.addresses = await Address.find({ _id: { $in: user.addresses } });

  await user.save();
  const { addresses, createdAt, email, id, role, updatedAt, profileImage } =
    user;
  return res
    .status(StatusCodes.OK)
    .json({
      addresses,
      createdAt,
      email,
      id,
      role,
      updatedAt,
      profileImage,
      name,
    });
};

export const deleteAddress = async (req, res) => {
  const { id: userId } = req.user;
  const { id: addressId } = req.params;

  // Find the user by ID
  const user = await User.findById(userId);
  if (!user) {
    throw new NotFoundError("User not found");
  }

  const addressIndex = user.addresses.findIndex(
    (address) => address._id.toString() === addressId
  );
  if (addressIndex === -1) {
    throw new NotFoundError("Address not found");
  }
  await Address.findOneAndDelete({ _id: addressId }, { new: true }).select(
    "password salt"
  );
  user.addresses.splice(addressIndex, 1);
  user.populate("addresses");
  await user.save();
  const {
    addresses,
    createdAt,
    email,
    id,
    role,
    updatedAt,
    profileImage,
    name,
  } = user;
  return res.status(StatusCodes.OK).json({
    addresses,
    createdAt,
    email,
    id,
    role,
    updatedAt,
    profileImage,
    name,
  });
};
