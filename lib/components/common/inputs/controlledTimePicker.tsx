import { Skeleton } from "@mui/material";
import { LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Control, Controller, FieldValues, Path, RegisterOptions } from "react-hook-form";
import dayjs from 'dayjs';

export function ControlledTimePicker<T extends FieldValues>({
    control,
    name,
    label,
    rules,
    isLoading = false,
    disabled
}: {
    control: Control<T>,
    name: Path<T>,
    label?: string,
    rules?: Omit<RegisterOptions<T, Path<T>>, 'disabled' | 'valueAsNumber' | 'valueAsDate' | 'setValueAs'>,
    isLoading?: boolean,
    disabled?: boolean,
}) {
    if (isLoading) {
        return (
            <Skeleton
                variant='rectangular'
                width='100%'
                height='40px'
                sx={{ borderRadius: '5px' }}
            />
        );
    }
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='es'>
            <Controller
                name={name}
                control={control}
                rules={rules}
                render={({ field: { onChange, value, ...restField }, fieldState: { error } }) => (
                    <TimePicker
                        {...restField}
                        label={label}
                        className='!w-[100%]'
                        value={value ? dayjs(value, 'HH:mm:ss') : null}
                        onChange={(newValue) => {
                            onChange(newValue ? newValue.format('HH:mm:ss') : '');
                        }}
                        format='HH:mm:ss'
                        ampm={false}
                        views={['hours', 'minutes', 'seconds']}
                        slotProps={{
                            textField: {
                                variant: 'outlined',
                                color: 'warning',
                                size: 'small',
                                disabled: disabled,
                                error: !!error,
                                helperText: error?.message,
                            }
                        }}
                    />
                )}
            />
        </LocalizationProvider>
    );
};
