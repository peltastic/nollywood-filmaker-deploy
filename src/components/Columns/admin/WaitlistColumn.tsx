import { ColumnDef } from "@tanstack/react-table"

export interface IWaitlistColumnData {
    name: string
    email: string
    date: string
    page: number
}

export const waitlist_column: ColumnDef<IWaitlistColumnData>[] = [
    {
        id: "s/n",
        cell: ({row}) => (
            <div className="">
                <p>{(row.original.page - 1) * 50 + 1 + row.index}</p>
            </div>
        )
    },
    {
        accessorKey: "name",
        header: () => <div className="pl-6">Full name</div>,
        cell: ({row}) => (
            <div className="mr-2 flex pl-6 py-6 text-base items-center">
                {row.getValue("name")}
            </div>
        )
    },
    {
        accessorKey: "email",
        header: () => <div className="">Email</div>,
        cell: ({row}) => (
            <div className="mr-2 flex text-base items-center">
                {row.getValue("email")}
            </div>
        )
    },
    {
        accessorKey: "date",
        header: () => <div className="">Date joined</div>,
        cell: ({row}) => (
            <div className="mr-2 text-base flex items-center">
                {row.getValue("date")}
            </div>
        )
    },

]