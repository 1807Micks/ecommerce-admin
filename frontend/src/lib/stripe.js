import { loadStripe } from "@stripe/stripe-js";

// Initialize Stripe once with your publishable key
export const stripePromise = loadStripe(
  "pk_test_51TMRdtKDpfIk2R2intvS0SVBmfAXtJyGRNNr1x3PzKVKLogLu1kQOqgpeB0aLbuowhLVNeUKKDqrypDWPcdk0X9m00kheUneUb",
);
