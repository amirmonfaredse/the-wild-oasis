"use server";
import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import {
  createBooking,
  deleteBooking,
  getBookings,
  updateBooking,
  updateGuest,
} from "./data-service";
import { redirect } from "next/navigation";

// Auth
export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}
export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}

export async function updateProfile(formData) {
  const session = await auth();
  if (!session) throw new Error("You Must Be Logged In");
  const nationalID = formData.get("nationalID");
  const [nationality, countryFlag] = formData.get("nationality").split("%");
  if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID))
    throw new Error("Please insert a valid national ID");
  const updateData = { nationality, countryFlag, nationalID };
  await updateGuest(session.user.guestId, updateData);
  revalidatePath("/account/profile");
}

export async function createReservation(reservationData, formData) {
  const session = await auth();
  if (!session) throw new Error("You Must Be Logged In");
  const newReservation = {
    ...reservationData,
    guestId: session.user.guestId,
    numGuests: Number(formData.get("numGuests")),
    observations: formData.get("observations").slice(0, 1000),
    extrasPrice: 0,
    totalPrice: reservationData.cabinPrice,
    isPaid: false,
    hasBreakfast: false,
    status: "unconfirmed",
  };
  await createBooking(newReservation);
  revalidatePath(`/cabins/${reservationData.cabinId}`);
  redirect('/thankyou')
}
export async function deleteReservation(bookingId) {
  const session = await auth();
  if (!session) throw new Error("You Must Be Logged In");

  const guestBookings = await getBookings(session.user.guestId);
  const guestBookingIds = guestBookings.map((booking) => booking.id);
  if (!guestBookingIds.includes(bookingId))
    throw new Error("You are Not Allowed to Delete This Reservation");

  await deleteBooking(bookingId);
  revalidatePath("/account/reservations");
  
}
export async function editReservation(formData) {
  const session = await auth();
  if (!session) throw new Error("You Must Be Logged In");
  const bookingId = Number(formData.get("bookingId"));

  const guestBookings = await getBookings(session.user.guestId);
  const guestBookingIds = guestBookings.map((booking) => booking.id);
  if (!guestBookingIds.includes(bookingId))
    throw new Error("You are Not Allowed to Change This Reservation");

  const updateData = {
    numGuests: Number(formData.get("numGuests")),
    observations: formData.get("observations"),
  };
  updateBooking(bookingId, updateData);
  revalidatePath("/account/reservations");
  revalidatePath(`/account/reservations/edit/${bookingId}`);
  redirect("/account/reservations");
}
