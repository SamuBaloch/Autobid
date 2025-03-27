export const Card = ({ children, className }) => (
    <div className={`bg-white p-6 rounded-lg shadow-md ${className}`}>
      {children}
    </div>
  );
  
  export const CardHeader = ({ children }) => (
    <div className="border-b pb-4 mb-4">
      {children}
    </div>
  );
  
  export const CardTitle = ({ children }) => (
    <h2 className="text-2xl font-bold">
      {children}
    </h2>
  );
  
  export const CardDescription = ({ children }) => (
    <p className="text-sm text-gray-600">
      {children}
    </p>
  );
  
  export const CardContent = ({ children }) => (
    <div className="mb-4">
      {children}
    </div>
  );
  
  export const CardFooter = ({ children }) => (
    <div className="border-t pt-4">
      {children}
    </div>
  );
  