import tripOBJs from "@/common/classes/trip.class";
import { cn } from "@/common/helpers";
import { TitleEnum } from "@/common/types";
import { useEffect, useMemo, useState } from "react";
import Dropdown from "../dropdowns/dropdown";
import Input from "../input";
import Seat from "../manage/seat";
import Modal from "../modal";

interface PassengerFormProps {
  formik: any;
  index: number;
  tripId: string;
  options: { value: string; label: string }[];
}

export default function PassengerForm({
  formik,
  index,
  options,
  tripId,
}: PassengerFormProps) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [bookedSeats, setBookedSeats] = useState<string[]>([]);

  function handleClose() {
    setOpen(false);
  }

  const getTitleOptions = () => {
    const options = Object.keys(TitleEnum).map((key) => ({
      value: key,
      label: TitleEnum[key as keyof typeof TitleEnum],
    }));
    return options;
  };

  useEffect(() => {
    setIsLoading(true);
    tripOBJs
      .getAllBookedSeatsByTripId({ tripId })
      .then((res: any) => {
        console.log(res, "records of park");
        setIsLoading(false);
        setBookedSeats(res);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err, "err");
      });
  }, [tripId]);

  const selectedSeats = useMemo(
    () =>
      formik.values.passengers
        .map((passenger: any) => passenger.seat)
        .filter((seat: any) => seat !== undefined && seat !== ""),
    [formik.values.passengers]
  );

  const unAvailableSeats = useMemo(() => {
    const combinedSeats = new Set([...bookedSeats, ...selectedSeats]);
    return Array.from(combinedSeats);
  }, [bookedSeats, selectedSeats]);

  return (
    <div className="space-y-6">
      <Dropdown
        options={getTitleOptions()}
        placeholder="Title"
        value={formik.values.passengers[index]?.title}
        label="Select Title"
        onSelect={(e: any) => {
          console.log("🚀 ~ e:", e);
          formik.setFieldValue(`passengers.${index}.title`, e);
        }}
        className={cn(
          "w-full",
          formik.touched.passengers?.[index]?.title &&
            formik.errors.passengers?.[index]?.title &&
            "border-red-600"
        )}
      />
      <Input
        label="First Name"
        type="text"
        id={`passengers.${index}.firstName`}
        name={`passengers.${index}.firstName`}
        value={formik.values.passengers[index]?.firstName}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={
          formik.touched.passengers?.[index]?.firstName &&
          formik.errors.passengers?.[index]?.firstName
        }
      />
      <Input
        label="Surname"
        type="text"
        id={`passengers.${index}.surname`}
        name={`passengers.${index}.surname`}
        value={formik.values.passengers[index]?.surname}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={
          formik.touched.passengers?.[index]?.surname &&
          formik.errors.passengers?.[index]?.surname
        }
      />
      <Input
        label="Email"
        type="email"
        id={`passengers.${index}.email`}
        name={`passengers.${index}.email`}
        value={formik.values.passengers[index]?.email}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={
          formik.touched.passengers?.[index]?.email &&
          formik.errors.passengers?.[index]?.email
        }
      />

      <Input
        label="Phone Number"
        type="tel"
        id={`passengers.${index}.phoneNumber`}
        name={`passengers.${index}.phoneNumber`}
        value={formik.values.passengers[index]?.phoneNumber}
        onChange={(event) => {
          let phoneNumber = event.target.value.replace(/\D/g, "");
          phoneNumber = phoneNumber.slice(0, 11);
          formik.setFieldValue(`passengers.${index}.phoneNumber`, phoneNumber);
        }}
        onBlur={formik.handleBlur}
        error={
          formik.touched.passengers?.[index]?.phoneNumber &&
          formik.errors.passengers?.[index]?.phoneNumber
        }
      />

      <Input
        label={
          <div className="flex mb-1 justify-between bg-red-">
            <span>Select Seat</span>
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="flex text-xs items-center bg-primary_light text-primary px-3 rounded-full"
            >
              Choose from Seat Arrangement
            </button>
          </div>
        }
        type="text"
        id={`passengers.${index}.seat`}
        name={`passengers.${index}.seat`}
        value={formik.values.passengers[index]?.seat}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        disabled
        error={
          formik.touched.passengers?.[index]?.seat &&
          formik.errors.passengers?.[index]?.seat
        }
      />

      <Input
        label="Extra Luggage"
        type="number"
        id={`passengers.${index}.extraLuggage`}
        name={`passengers.${index}.extraLuggage`}
        value={formik.values.passengers[index]?.extraLuggage}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={
          formik.touched.passengers?.[index]?.extraLuggage &&
          formik.errors.passengers?.[index]?.extraLuggage
        }
      />
      <Modal
        isOpen={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Seat
          vehicleType={"bus"}
          onSeatSelect={(e: any) => {
            formik.setFieldValue(`passengers.${index}.seat`, e);
          }}
          initiallySelectedSeats={unAvailableSeats}
        />
      </Modal>
    </div>
  );
}
