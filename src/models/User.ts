import mongoose, { Document, Model, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    isAdmin: boolean;
    avatar: string;
    matchPassword: (enteredPassword: string) => Promise<boolean>;
}

interface UserModel extends Model<IUser> {
    // Add static methods here if any
}

const userSchema = new Schema<IUser>({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false,
    },
    avatar: {
        type: String,
        default: '',
    }
}, {
    timestamps: true,
});

userSchema.methods.matchPassword = async function (enteredPassword: string) {
    return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre('save', async function (this: IUser) {
    if (!this.isModified('password')) {
        return;
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// Avoid recompiling model in Next.js hot reload
const User = (mongoose.models.User as UserModel) || mongoose.model<IUser, UserModel>('User', userSchema);

export default User;
