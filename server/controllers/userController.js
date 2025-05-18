const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const prisma = new PrismaClient();

const getUserById = async (req, res) => {
  try {
    //extract ID from params
    const { id } = req.params;
    const userId = parseInt(id);

    //find user from the database
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        username: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    //check user existence
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    //verify access (admin or plan user)
    if (req.user.id !== userId && req.user.role !== "USER") {
      return res.status(403).json({ message: "Access denied" });
    }
    //return data
    res.json({ message: "User retrieved successfully", user });
  } catch (error) {
    //handle errors
    console.error("Error retrieving user:", error);
    res
      .status(500)
      .json({ message: "Error retrieving user", error: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = parseInt(id);
    const { email, username, password } = req.body;

    //verify access
    if (req.user.id !== userId && req.user.role !== "USER") {
      return res.status(403).json({ message: "Access denied" });
    }

    //validate input
    if (!email && !username && !password) {
      return res
        .status(400)
        .json({ message: "At least one field should be filled in" });
    }

    //prepare data (update the changed field(s), not all of them)
    const updateData = {};
    if (email) updateData.email = email;
    if (username) updateData.username = username;
    if (password) updateData.password = await bcrypt.hash(password, 10);

    //update user
    const user = await prisma.user.update({
      where: { id: userId },
      data: updateData,
      select: {
        id: true,
        email: true,
        username: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    res.json({ message: "User updated successfully", user });
  } catch (error) {
    //handle errors
    console.error("Error updating user:", error);
    if (error.code === "P2002") {
      return res.status(400).json({ message: "Email already in use" });
    }
    res
      .status(500)
      .json({ message: "Error updating user", error: error.message });
  }
};

const getAllUsers = async (req, res) => {
    try {
        //set pagination and limit
        const {page = 1, limit = 10} = req.query; //?page=2&limit=20 with default values
        const pageNum = parseInt(page);
        const limitNum = parseInt(limit);
        const skip = (pageNum - 1) * limitNum;

        //Get users with pagination
        const [users, total] = await Promise.all([
            prisma.user.findMany({
                skip,
                take: limitNum,
                select: { id: true, email: true, username: true, role: true, createdAt: true, updatedAt: true },
                orderBy: {createdAt: 'desc'} //starting from the most recent
            }),
            prisma.user.count(), //total number of users for pagination calculation
        ]);

        res.json({
            message: "Users retrieved successfully",
            users,
            pagination: {
                page: pageNum,
                limit: limitNum,
                total,
                pages: Math.ceil(total / limitNum),
            },
        });
    } catch (error) {
        console.error('Error retrieving users:', error);
        res.status(500).json({ message: 'Error retrieving users', error: error.message });
    }
}

module.exports = { getUserById, updateUser, getAllUsers };
