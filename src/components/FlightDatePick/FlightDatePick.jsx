import React, { useState } from "react";
import { DayPicker } from "react-day-picker";
import { CalendarDays } from "lucide-react";
import "react-day-picker/dist/style.css";
import { format } from "date-fns";
import vi from "date-fns/locale/vi";

export default function FlightDatePick() {
    const [startDate, setStartDate] = useState(new Date());
    const [returnDate, setReturnDate] = useState(new Date());
    const [showStartPicker, setShowStartPicker] = useState(false);
    const [showReturnPicker, setShowReturnPicker] = useState(false);
    const [isRoundTrip, setIsRoundTrip] = useState(true); // thêm state cho khứ hồi

    return (
        <div className="flex flex-col gap-1 text-white">
            <div className="flex items-center gap-4 text-sm font-semibold">
                <span>Ngày khởi hành</span>
                <label className="flex items-center gap-1 cursor-pointer">
                    <input
                        type="checkbox"
                        className="accent-blue-600"
                        checked={isRoundTrip}
                        onChange={(e) => {
                            setIsRoundTrip(e.target.checked);
                            if (!e.target.checked) {
                                setShowReturnPicker(false); // tắt picker nếu bỏ chọn khứ hồi
                            }
                        }}
                    />
                    <span>Khứ hồi</span>
                </label>
            </div>

            <div className="flex items-center bg-white rounded-full text-black overflow-hidden w-fit">
                {/* Ngày đi */}
                <div
                    className="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-100"
                    onClick={() => {
                        setShowStartPicker((prev) => !prev);
                        setShowReturnPicker(false);
                    }}
                >
                    <CalendarDays className="text-blue-500" />
                    <span>{format(startDate, "d 'thg' M yyyy", { locale: vi })}</span>
                </div>

                {/* Divider */}
                {isRoundTrip && <div className="border-l border-gray-300 h-6" />}

                {/* Ngày về */}
                {isRoundTrip && (
                    <div
                        className="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-100"
                        onClick={() => {
                            setShowReturnPicker((prev) => !prev);
                            setShowStartPicker(false);
                        }}
                    >
                        <CalendarDays className="text-blue-500" />
                        <span>{format(returnDate, "d 'thg' M yyyy", { locale: vi })}</span>
                    </div>
                )}
            </div>

            {/* Date pickers */}
            {showStartPicker && (
                <div className="bg-white fixed text-black w-80 p-2 shadow-2xl">
                    <DayPicker
                        mode="single"
                        selected={startDate}
                        onSelect={(date) => {
                            setStartDate(date);
                            setShowStartPicker(false);
                        }}
                        locale={vi}
                    />
                </div>
            )}

            {isRoundTrip && showReturnPicker && (
                <div className="bg-white fixed text-black w-80 p-2 shadow-2xl">
                    <DayPicker
                        mode="single"
                        selected={returnDate}
                        onSelect={(date) => {
                            setReturnDate(date);
                            setShowReturnPicker(false);
                        }}
                        locale={vi}
                    />
                </div>
            )}
        </div>
    );
}
