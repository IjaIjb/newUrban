import VehicleApi from "@/common/classes/vehicles.class";
import { VehicleType } from "@/common/types";
import { FormikProps } from "formik";
import React, { Dispatch, useEffect, useState } from "react";
import Dropdown from "./dropdown";

interface DropdownOption {
  value: string;
  label: string;
}

interface FormValues {
  typeOfVechicle: string;
}

interface TypeOfVehicleDropdownProps {
  formik: FormikProps<FormValues>;
  setSelectedVehicle: Dispatch<any>;
}

const TypeOfVehicleDropdown: React.FC<TypeOfVehicleDropdownProps> = ({
  formik,
  setSelectedVehicle,
}) => {
  const [carTypes, setCarTypes] = useState<DropdownOption[]>([]);
  const [vehicles, setVehicles] = useState<VehicleType[]>([]);

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCarTypes = async () => {
      try {
        VehicleApi.allvehicles()
          .then((res: VehicleType[]) => {
            console.log(res, "records of park");
            setLoading(false);
            const transformedData: DropdownOption[] = res?.map(
              (item: VehicleType) => ({
                value: item.id,
                label: item.vehicleType,
              })
            );
            setVehicles(res);

            setCarTypes(transformedData);
          })
          .catch((err) => {
            setLoading(false);
            console.log(err, "err");
          });
      } catch (error) {
        console.error("Error fetching car types:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCarTypes();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Dropdown
      options={carTypes}
      placeholder="Type of Vehicle"
      className="w-full"
      value={formik.values.typeOfVechicle}
      onSelect={(value: string) => {
        setSelectedVehicle(
          vehicles?.find((option: any) => {
            return option.id === value;
          })
        );
        formik.setFieldValue("typeOfVechicle", value);
      }}
      error={formik.errors.typeOfVechicle}
    />
  );
};

export default TypeOfVehicleDropdown;
