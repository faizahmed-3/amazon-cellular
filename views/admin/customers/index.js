const {displayDate} = require('../../../middlewares/otherFunctions');
const layout = require('../layout');
const title = 'View Customers';

module.exports = ({customers}) => {
    const renderedCustomers = customers.map(
        customer => {
            return `
<tr>
    <td>${displayDate(customer.dateCreated)}</td>
    <td>${customer.full_name}</td>
    <td>${customer.email}</td>
    <td>${customer.phone}</td>
    <td>${customer.latitude}/${customer.latitude}</td>
</tr>
            `}).join('')

    return layout({
        title: title,
        content: `
        <div id="viewProducts" class="card ">
    <div class="card-body table-responsive-md">
        <table class="table table-hover table-bordered">
            <thead>
            <tr class="table-dark">
                <th scope="col" class="tableHeader">Date Created</th>
                <th scope="col" class="tableHeader">Name</th>
                <th scope="col" class="tableHeader">Email</th>
                <th scope="col" class="tableHeader">Phone</th>
                <th scope="col" class="tableHeader">Lat/Lng</th>
            </tr>
            </thead>
            <tbody>
            ${renderedCustomers}
            </tbody>
        </table>
    </div>
</div>
        `})
}