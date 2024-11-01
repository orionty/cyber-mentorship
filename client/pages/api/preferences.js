import dbConnect from '../../lib/dbConnect';
import User from '../../models/User';
import { verifyToken } from '../../utils/tokens';

export default async function handler(req, res) {
  if (req.method !== 'PUT') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Verify token
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const decoded = await verifyToken(token);
    if (!decoded) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    await dbConnect();

    const { emailNotifications, smsNotifications, marketingEmails } = req.body;

    // Update user preferences
    const updatedUser = await User.findByIdAndUpdate(
      decoded.userId,
      {
        preferences: {
          emailNotifications,
          smsNotifications,
          marketingEmails,
        }
      },
      { new: true, runValidators: true }
    ).select('-password');

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
      message: 'Preferences updated successfully',
      preferences: updatedUser.preferences
    });
  } catch (error) {
    console.error('Preferences update error:', error);
    res.status(500).json({ message: 'Error updating preferences' });
  }
}