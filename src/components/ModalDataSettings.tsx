import React, { Fragment, useRef, useState, useEffect } from "react";
import { Transition } from "@headlessui/react";
import modalClosingButton from "./../images/Xbutton.svg";
import "./../css/modal.scss";
import { getUrlApi } from "../endpoints";
import axios from "axios";
import { getStorageItem } from "../utils/localStorage";

const ModalDataSettings = ({
  open,
  setOpen,
  selectedElement,
  setSelectedElement,
  report,
  array,
  setData,
  setIsLoading,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  selectedElement: any;
  setSelectedElement: (selectedElement: any) => void;
  report?: any;
  array: any;
  setData: (array: any) => void;
  setIsLoading: (isLoading: boolean) => void;
}) => {
  // eslint-disable-next-line
  const cancelButtonRef = useRef(null);

  const [min, setMin] = useState<number>(0);
  const [max, setMax] = useState<number>(0);

  const minRange = 0;
  const maxRange = 100;

  const save = async () => {
    if (min < max) {
      setIsLoading(true);

      const foundIndex =
        selectedElement &&
        array &&
        array.length &&
        array.findIndex(({ id }: { id: number }) => id === selectedElement.id);

      array[foundIndex].range.min = min;
      array[foundIndex].range.max = max;

      setData([...array]);

      try {
        await axios.post(
          `${getUrlApi("sensors/ranges")}/${selectedElement.id}`,
          {
            min,
            max,
          },
          {
            headers: {
              Authorization: `Bearer ${getStorageItem("tokenJwt")}`,
            },
          }
        );
        setOpen(false);
      } catch (error) {
        console.log("SEND DATA ERROR");
      } finally {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    console.log("SELE: ", selectedElement);

    if (selectedElement) {
      const {
        range: { min, max },
      } = selectedElement;

      setMin(min);
      setMax(max);
    }
  }, [selectedElement]);

  return (
    <Transition.Root
      show={open}
      as={Fragment}
      enter="ease-out duration-300"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="ease-in duration-200"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div className="modal_data">
        <div className="modal">
          <img
            alt="btn"
            src={modalClosingButton}
            id="close_btn"
            onClick={() => {
              setOpen(false);
              setSelectedElement(undefined);
            }}
          />

          {selectedElement && (
            <div className="modal_content">
              <h1>{selectedElement.machine.typology}</h1>

              <p>{selectedElement.typology}</p>

              <div className="input_container">
                <p>Minimo: {min}</p>
                <input
                  type="range"
                  min={minRange}
                  max={maxRange}
                  defaultValue={min}
                  value={min}
                  onChange={({ target: { value } }) => {
                    const val = Number(value);
                    val < max && setMin(val);
                  }}
                />
              </div>

              <div className="input_container">
                <p>Massimo: {max}</p>
                <input
                  type="range"
                  min={minRange}
                  max={maxRange}
                  defaultValue={max}
                  value={max}
                  onChange={({ target: { value } }) => {
                    const val = Number(value);
                    val > min && setMax(val);
                  }}
                />
              </div>

              <button id="confirm-btn" onClick={save}>
                Conferma
              </button>
            </div>
          )}
        </div>
      </div>
    </Transition.Root>
  );
};

export default ModalDataSettings;
