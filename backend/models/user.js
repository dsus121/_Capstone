import mongoose from "mongoose";
import bcrypt from "bcryptjs"; // For password hashing

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profile: {
      firstName: { type: String, default: "", match: /^[a-zA-Z]+$/ }, // added regex
      lastName: { type: String, default: "", match: /^[a-zA-Z]+$/ },
      avatarURL: { type: String, default: "" }, // save for later
    },
    causes: [
      {
        id: { type: String, required: true },
        name: {
          type: String,
          enum: [
            "Health",
            "Education",
            "Environment",
            "Animal Welfare",
            "Community",
            "Other",
          ],
          required: true,
        },
        description: { type: String, default: "" },
      },
    ],
    paymentProcessor: {
      type: String,
      enum: ["Stripe", "PayPal", "Other"],
      default: "Other"
    },
    paymentDetails: {
      processorName: { type: String }, // Stripe, PayPal, etc.
      processorData: { type: mongoose.Schema.Types.Mixed },
    },
    donationHistory: [
      {
        transactionId: { type: String, required: true },
        amount: { type: Number, required: true },
        date: { type: Date, default: Date.now },
        causeId: { type: String, required: true },
        causeName: { type: String, required: true },
      },
    ],

    cookiejar: {
      fundsAvailable: { type: Number, default: 0 }, // Store the available balance
      fundingHistory: [
        {
          source: { type: String, required: true }, // E.g., Bank account, card, etc.
          amount: { type: Number, required: true }, // Amount added to cookiejar
          dateTime: { type: Date, default: Date.now }, // Date and time of funding
        },
      ],
    },
    preferences: {
      notifications: { type: Boolean, default: true },
      theme: { type: String, default: "light" }, // UI preferences (e.g., dark mode)
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

// authentication -- password hashing middleware
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    console.error("Password hashing error:", error);
    next(error);
  }
});

// compare passwords function
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;
