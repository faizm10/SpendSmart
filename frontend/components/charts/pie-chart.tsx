"use client";

import { PIE_CHART_DATA } from "@/lib/data"; // Data for the chart
import { Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

export default function SpendingDistributionChart() {
  return (
    <ResponsiveContainer width="100%" minHeight={300} className="-mx-5 mt-2">
      {/* PieChart Component */}
      <PieChart>
        {/* Tooltip Settings */}
        <Tooltip
          contentStyle={{
            backgroundColor: "hsl(var(--background))", // Tooltip background color
          }}
          formatter={(value: number) => [`${value}%`, "Percentage"]} // Format the tooltip to show percentages
          itemStyle={{
            color: "inherit", // Tooltip text color
          }}
        />
        {/* Legend Settings */}
        <Legend />
        <Pie
          data={PIE_CHART_DATA} // Data for the pie chart
          dataKey="percentage" // Key to determine the value for slices
          nameKey="category" // Key to determine the labels for slices
          cx="50%" // X-coordinate of the center of the pie chart
          cy="47%" // Y-coordinate of the center of the pie chart
          fill="hsl(var(--primary))" // Fill color for the pie chart
          stroke="hsl(var(--muted))" // Border color for slices
          strokeWidth={2} // Width of the slice borders
          label={({ name, value }) => `${name}: ${value}%`} // Labels for each slice
        />
      </PieChart>
    </ResponsiveContainer>
  );
}

/**
 * Customization Guide:
 * 
 * 1. Changing the Data:
 *    - Update the `PIE_CHART_DATA` in "@/lib/data" to modify categories or percentages.
 *    - Ensure the data has `category` (name) and `percentage` (value) keys.
 * 
 * 2. Adding or Removing Data:
 *    - Add more objects to `PIE_CHART_DATA` for additional slices.
 *    - Remove objects to reduce the number of slices.
 * 
 * 3. Changing the Colors:
 *    - Update the `fill` property in the <Pie /> component to set the fill color.
 *    - Update the `stroke` property in the <Pie /> component to change the border color.
 *      Example:
 *      fill="hsl(220, 80%, 60%)"
 *      stroke="hsl(0, 0%, 90%)"
 * 
 * 4. Adjusting the Spacing:
 *    - Modify `cx` and `cy` to change the position of the pie chart within the container.
 *    - Example:
 *      cx="60%" // Moves the chart to the right
 *      cy="40%" // Moves the chart upward
 * 
 * 5. Changing the Size of the Chart:
 *    - Update the `minHeight` or `width` in <ResponsiveContainer /> to resize the chart.
 *      Example:
 *      <ResponsiveContainer width="90%" minHeight={400} />
 * 
 * 6. Customizing the Tooltip:
 *    - Modify the `formatter` function to change how tooltip values are displayed.
 *    - Example:
 *      formatter={(value: number) => [`$${value}`, "Amount"]}
 * 
 * 7. Removing Labels:
 *    - If you want to remove labels from the slices, remove the `label` prop from the <Pie /> component.
 * 
 */
