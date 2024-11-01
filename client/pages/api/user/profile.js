import dbConnect from '../../../lib/dbConnect';
import User from '../../../models/User';
import { verifyToken } from '../../../utils/tokens';

export default async function handler(req, res) {
  // Connect to database
  await dbConnect();

  // Verify token for all requests
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const decoded = await verifyToken(token);
  if (!decoded) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  // Handle GET request
  if (req.method === 'GET') {
    try {
      const user = await User.findById(decoded.userId)
        .select('-password')
        .lean();

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      return res.status(200).json({
        user: {
          _id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phone: user.phone,
          bio: user.bio,
          avatar: user.avatar,
          preferences: user.preferences
        }
      });
    } catch (error) {
      console.error('Profile fetch error:', error);
      return res.status(500).json({ message: 'Error fetching profile' });
    }
  }

  // Handle PUT request
  if (req.method === 'PUT') {
    try {
      const { firstName, lastName, email, phone, bio } = req.body;

      // Check if email is already taken by another user
      const existingUser = await User.findOne({ 
        email, 
        _id: { $ne: decoded.userId } 
      });
      
      if (existingUser) {
        return res.status(400).json({ message: 'Email already in use' });
      }

      // Update user profile
      const updatedUser = await User.findByIdAndUpdate(
        decoded.userId,
        {
          firstName,
          lastName,
          email,
          phone,
          bio,
        },
        { new: true, runValidators: true }
      ).select('-password');

      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }

      return res.status(200).json({
        message: 'Profile updated successfully',
        user: updatedUser
      });
    } catch (error) {
      console.error('Profile update error:', error);
      return res.status(500).json({ message: 'Error updating profile' });
    }
  }

  // Handle other methods
  return res.status(405).json({ message: 'Method not allowed' });
}