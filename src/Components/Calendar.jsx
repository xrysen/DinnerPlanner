import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import "./Calendar.scss";

const Calendar = () => {

  return (
    <div className = "calendar-container">

    <TableContainer component = {Paper}>
      <TableHead>
        <TableRow>
          <TableCell>Sunday</TableCell>
          <TableCell>Monday</TableCell>
          <TableCell>Tuesday</TableCell>
          <TableCell>Wednesday</TableCell>
          <TableCell>Thursday</TableCell>
          <TableCell>Friday</TableCell>
          <TableCell>Saturday</TableCell>
        </TableRow>
      </TableHead>
    </TableContainer>
    </div>
  )

}

export default Calendar;