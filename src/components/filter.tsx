import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import { ChangeEvent, useEffect, useState } from "react";
import deleteIcon from "../assets/deleteIcon";
import ClearIcon from "../assets/clearIcon";
import { useDispatch } from "react-redux";
import { setGlobalFilterData } from "../Redux/filterSlice";
interface filterMenuProps {
  filterMenuData: string[];
  placeholder: string;
  variant: "search" | "filter";
}
// Constants for styling
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
const inputStyles = {
  height: "auto",
  "& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input": {
    padding: "0px !important",
    paddingLeft: "8px !important",
    fontSize: "12px !important",
    color: "black",
  },
  "& .css-1x5jdmq":{
    fontSize:"12px !important",
  }
};
const selectStyles = {
  minHeight: "38px",
  "& .css-4ygxeq-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input": {
    padding: "4px",
  },
};
const chipStyles = {
  borderRadius: "2px",
  backgroundColor: "rgb(230, 230, 230)",
  height: "auto",
  "& .MuiChip-deleteIcon:hover": {
    backgroundColor: "rgb(255, 189, 173)",
  },
};

// Component for separating the bar
const Bar = () => (
  <div
    style={{
      alignSelf: "stretch",
      width: "1px",
      backgroundColor: "rgb(204, 204, 204)",
      marginBottom: "8px",
      marginTop: "8px",
      boxSizing: "border-box",
      position: "relative",
      right: "25px",
    }}
  ></div>
);

// Main Filter component
const Filter = ({ filterMenuData, placeholder, variant }: filterMenuProps) => {
  // State for filter data
  const [filterData, setFilterData] = useState<string[]>([]);
  const dispatch = useDispatch();
  const [updatedFilterMenuData, setUpdatedFilterMenuData] =
    useState<string[]>(filterMenuData);

  // Function to handle chip delete
  const handleDelete = (chipToDelete: string) => () => {
    setFilterData((chips) => {
      const updatedChips = chips.filter((chip) => chip !== chipToDelete);
      setUpdatedFilterMenuData((prevMenuData) => {
        const uniqueMenuData = new Set([chipToDelete, ...prevMenuData]);
        return Array.from(uniqueMenuData);
      });
      return updatedChips;
    });
  };

  // Dispatch filter data when it changes
  useEffect(() => {
    dispatch(setGlobalFilterData({ placeholder, filterData }));
  }, [filterData]);

  // Function to handle change in select input
  const handleChange = (event: SelectChangeEvent<typeof filterData>) => {
    const { value } = event.target;
    setFilterData(value as string[]);
  };

  // Function to clear filter
  const clearFilter = () => {
    setFilterData([]);
    setUpdatedFilterMenuData(filterMenuData);
  };

  return (
    <div>
      {/* To avoid layout shift */}
      {filterData.length !== 0 ? (
        <div
          style={{
            fontSize: "13px",
            fontWeight: "400",
            paddingLeft: "4%",
            height: "10px",
          }}
        >
          {placeholder}
        </div>
      ) : (
        <div style={{ opacity: "0", height: "10px" }}>{placeholder}</div>
      )}
      <FormControl
        sx={{ m: 1, minWidth: 150, maxWidth: 1000, height: 38 }}
        key={placeholder}
      >
        {/* Render input based on variant */}
        {variant === "search" ? (
          <OutlinedInput
            placeholder={placeholder}
            value={filterData}
            sx={inputStyles}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              handleChange(event)
            }
          />
        ) : (
          <Select
            labelId="demo-multiple-chip-label"
            id="demo-multiple-chip"
            displayEmpty
            multiple
            value={filterData}
            onChange={handleChange}
            input={
              <OutlinedInput
                id="select-multiple-chip"
                sx={selectStyles}
                endAdornment={<Bar />}
              />
            }
            renderValue={(selected) => {
              // Render selected chips
              if (selected.length === 0) {
                return (
                  <div
                    style={{
                      color: "rgb(128, 128, 128)",
                      fontSize: "12px",
                      padding: "2px 4px",
                    }}
                  >
                    {placeholder}
                  </div>
                );
              }
              return (
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip
                        clickable
                        key={value}
                        label={value}
                        onDelete={handleDelete(value)}
                        sx={chipStyles}
                        deleteIcon={deleteIcon()}
                        onMouseDown={(event) => {
                          event.preventDefault();
                          event.stopPropagation();
                        }}
                      />
                    ))}
                  </Box>
                  {/* Clear filter icon */}
                  <ClearIcon
                    onMouseDown={(event) => {
                      event.preventDefault();
                      event.stopPropagation();
                    }}
                    onClick={clearFilter}
                  />
                </Box>
              );
            }}
            MenuProps={MenuProps}
          >
            {/* Render menu items */}
            {updatedFilterMenuData.length !== 0 ? (
              updatedFilterMenuData.map((menuData) => (
                <MenuItem
                  key={menuData}
                  value={menuData}
                  onClick={() => {
                    setUpdatedFilterMenuData((prevMenuData) =>
                      prevMenuData.filter((n) => n !== menuData)
                    );
                  }}
                >
                  {menuData}
                </MenuItem>
              ))
            ) : (
              <MenuItem value="" disabled>
                No options available
              </MenuItem>
            )}
          </Select>
        )}
      </FormControl>
    </div>
  );
};

export default Filter;
